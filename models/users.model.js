const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema= new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    whishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.passwordMatches = async function(loginPassword) {
  return await bcrypt.compare(loginPassword, this.password)
}

module.exports = mongoose.model("User", userSchema);