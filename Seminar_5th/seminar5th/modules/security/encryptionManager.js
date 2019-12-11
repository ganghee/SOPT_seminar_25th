const crypto = require('crypto')

const encryptionManager = {
    encryption: (data, salt) => {
        const hashedPwd = crypto.pbkdf2Sync(data, salt, 10000, 64, 'sha512').toString('base64')
        return hashedPwd
    },
    makeRandomByte: () => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(32, function (err, buffer) {
                if (err) {
                    reject(err)
                    return
                }
                resolve(buffer.toString('base64'))
            })
        })
    },
}
module.exports = encryptionManager