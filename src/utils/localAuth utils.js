import bcrypt from 'bcrypt';

export default async function localAuth(prisma, email, phone, password) {

    // cheak if user exisit
    async function userAuth(email, phone) {

        if (!phone && email) {
            const emailExisit = await prisma.user.findUnique({ where: { email: email } });
            return emailExisit;
        } else {
            const phoneExisit = await prisma.user.findUnique({ where: { phone: phone } });
            return phoneExisit;
        }

    }

    const doesUserExisit = await userAuth(email, phone);

    // if not return error
    if (!doesUserExisit) {
        return {
            error: true,
            status: 404,
            message: `user not found: ${email}`
        }
    }

    // if all ok cheak password
    const doesPasswordCorrect = await bcrypt.compare(password, doesUserExisit.password);

    // if turns out wrong send error
    if (!doesPasswordCorrect) {
        return {
            error: true,
            status: 400,
            message: `password did not matched`
        }
    }

    return doesUserExisit;
}