import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Alert,
} from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "@/features/auth/hooks/useRegister";
import classes from "./RegisterForm.module.css";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, error, loading } = useRegister();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!fullName || !email || !phone || !password || !confirmPassword || !address) {
      setValidationError("Please fill in all fields");
      return;
    }

    if (!(/^\p{Lu}\p{Ll}+(?:\s\p{Lu}\p{Ll}+)+$/u.test(fullName))) {
      setValidationError("Please enter your full name");
      return;
    }

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return;
    }

    const result = await register({
      full_name: fullName,
      email: email,
      phone: phone,
      password: password,
      address: address,
    });

    if (result.success === true) {
      navigate("/");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create an account
      </Title>

      <Text className={classes.subtitle}>
        Do you have an account?{" "}
        <Anchor component={Link} to="/login">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          {(error || validationError) && (
            <Alert color="red" mb="md" title="Error">
              {error || validationError}
            </Alert>
          )}

          <TextInput
            label="Full Name"
            placeholder="Ivan Ivanov"
            required
            radius="md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <TextInput
            label="Email"
            placeholder="email@example.com"
            required
            radius="md"
            type="email"
            mt="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            label="Phone"
            placeholder="+77012345678"
            required
            radius="md"
            mt="md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextInput
            label="Address"
            placeholder="Kazakhstan, Astana, Mangilik El 55/11"
            required
            radius="md"
            mt="md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            required
            mt="md"
            radius="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            fullWidth
            mt="xl"
            radius="md"
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
