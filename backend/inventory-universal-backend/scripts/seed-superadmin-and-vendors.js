const bcrypt = require('bcrypt')
const connectDB = require('../dist/mongodb').connectDB
const User = require('../dist/auth/model/user').default
const Vendor = require('../dist/user/model/vendor').default
const VendorItems = require('../dist/user/model/vendor-items').default

async function seed(){
    const dbPass = process.env.DB_PASSWORD
    await connectDB('MOqfzNtZrk4y9yqJ')

    // create super admin if not exists
    const superEmail = process.env.SEED_SUPER_EMAIL || 'super@mysockhq.test'
    const superPassword = process.env.SEED_SUPER_PASSWORD || 'SuperSecret123'
    let superUser = await User.findOne({ email: superEmail }).exec()
    if (!superUser){
        const hashed = await bcrypt.hash(superPassword, 10)
        superUser = await User.create({ fullName: 'Super Admin', businessName: 'My Stock HQ', email: superEmail, password: hashed, designation: 'super' })
        console.log('Created super admin ->', superEmail)
    } else {
        console.log('Super admin already exists ->', superEmail)
    }

    // sample vendors
    const vendors = [
        { vendorId: 'vendor-001', vendorName: 'Acme Supplies', category: 'retail', description: 'Office and retail supplies', images: [], contact: { phone: '08000000001', email: 'acme@example.com' } },
        { vendorId: 'vendor-002', vendorName: 'FarmFresh', category: 'agriculture', description: 'Fresh farm produce supplier', images: [], contact: { phone: '08000000002', email: 'farm@example.com' } }
    ]

    for (const v of vendors){
        const existing = await Vendor.findOne({ vendorId: v.vendorId }).exec()
        if (!existing){
            await Vendor.create(v)
            console.log('Created vendor', v.vendorId)
            // create empty vendor items doc
            await VendorItems.create({ vendorId: v.vendorId, items: [] })
            console.log('Created vendor items container for', v.vendorId)
        } else {
            console.log('Vendor exists', v.vendorId)
        }
    }

    console.log('\nSeed complete. Summary:')
    console.log('- Super admin:', superEmail)
    console.log('- Vendors:', vendors.map(v=>v.vendorId).join(', '))
    console.log('\nNOTE: To sign in as super admin using current API, use the OTP flow to create account or use the seeded credentials if you set SEED_SUPER_PASSWORD env var and want to login via /auth/login')

    process.exit(0)
}

seed().catch(e => { console.error(e); process.exit(1) })
