/**
 * Simple migration script to move per-user VendorItemsManagement to global VendorItems
 * Run with: node scripts/migrate_vendor_items_to_global.js
 * Ensure DB_PASSWORD environment variable is set
 */

const mongoose = require('mongoose')
const VendorItemsManagement = require('../dist/src/user/model/vendor-items-management').default
const VendorItems = require('../dist/src/user/model/vendor-items').default
const connectDB = require('../dist/src/mongodb').connectDB

async function migrate(){
    const dbPass = process.env.DB_PASSWORD || ''
    await connectDB(dbPass)

    const docs = await VendorItemsManagement.find({}).lean().exec()
    for (const doc of docs){
        const userEmail = doc.userEmail
        const vendors = doc.vendors || []
        for (const v of vendors){
            const vendorId = v.vendorId
            const items = v.items || []
            if (!vendorId) continue
            const existing = await VendorItems.findOne({ vendorId }).exec()
            if (!existing){
                await VendorItems.create({ vendorId, items })
                console.log('Created vendorItems for', vendorId)
            } else {
                // merge items
                const existingIds = new Set((existing.items || []).map(i => i.itemId))
                const newItems = items.filter(i => !existingIds.has(i.itemId))
                if (newItems.length) {
                    await VendorItems.findOneAndUpdate({ vendorId }, { $push: { items: { $each: newItems } } }).exec()
                    console.log('Merged', newItems.length, 'items into', vendorId)
                }
            }
        }
    }
    console.log('Migration complete')
    process.exit(0)
}

migrate().catch(e => { console.error(e); process.exit(1) })
