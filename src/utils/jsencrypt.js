import JSEncrypt from 'jsencrypt'

export function encrypt(data) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey('yuan')
    return encryptor.encrypt(data)
}