import { Schema, model } from "mongoose";
import { hash } from "bcrypt";

const UserSchema = new Schema(
    {

        fullName: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        username: {
            type: String,
            required: true
        },
        password: { type: String, required: true },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ],
        followees: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ]
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function () {
    try {
        const hashedPwd = await hash(this.password, 10)
        this.password = hashedPwd
    } catch (error) {
        console.log('error hashing password', error.message)
    }
})

const User = model('users', UserSchema)

export default User