import { loginUser } from "./auth.service.js";
import { validateLoginInput } from "./auth.validator.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validation = validateLoginInput({
      email,
      password,
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const result = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    if (
      error.message === "Invalid email or password" ||
      error.message === "User account is inactive"
    ) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};