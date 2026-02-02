import Customer from '../model/user-model.js';
import { hashPassword, comparePassword } from '../utils/auth-utils.js';

async function registerUserService({ full_name, email, password, phone, address }) {
    const hashedPassword = await hashPassword(password);

    const newCustomer = new Customer({
        full_name,
        email,
        phone,
        address,
        created_at: new Date(),
        password: hashedPassword,
        role: 'customer'
    });

    await newCustomer.save();

    return newCustomer;
}

async function loginUserService({ email, password }) {
    const user = await Customer.findOne({ email }, { password: 1, email: 1 }).lean().exec();

    if (!user) {
        return null;
    }

    const isValid = await comparePassword(user.password, password);
    if (!isValid) {
        return null;
    }

    return user;
}

export { registerUserService, loginUserService };
