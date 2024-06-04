import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Button,
  Checkbox,
  Link,
  Box,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowPathIcon,
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import captchaBackground from "../../assets/images/bg6.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../reducers/auth";

export default function LoginForm(props) {

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // States
  const [showPassword, setShowPassword] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Toast Alerts
  const toastMessage = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3500,
      isClosable: false,
    })
  }

  // Handle Clicks
  const handleClick = () => setShowPassword(!showPassword);

  const handleCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  // Get captcha code
  const getCaptchaCode = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/captcha`);
      setCaptchaCode(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Refresh captcha
  const refreshCaptcha = () => {
    getCaptchaCode();
  };

  // Login
  const onBtnLogin = async () => {
    try {
      if (inputCaptcha !== captchaCode) {
        toastMessage(
          'Wrong captcha.',
          'Either your credentials or captcha are wrong. Please try again.',
          'error'
        );
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/auth`, {
        email: inputEmail,
        password: inputPassword,
      });

      const data = response.data;

      const {
        name,
        token,
        success,
      } = data;

      if (success) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("name", name);
        dispatch(loginAction(response.data))

        navigate("/dashboard", { replace: true });
        toastMessage("Sign in successful.", `Welcome, ${name}!`, "success");
      } else {
        toastMessage("Something went wrong.", "Please contact the site administrator for support", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCaptchaCode();
  }, []);

  return (
    <Flex
      flexDir={"column"}
      w={"full"}
      minHeight={"screen"}
      justify={"center"}
      align={"center"}
    >
      <Text fontSize={"3xl"} fontWeight={"semibold"} mb={8}>
        Sign In
      </Text>

      {/* -----------------Email----------------- */}
      <InputGroup w={"50%"} mb={4}>
        <Input
          type="email"
          size={"md"}
          placeholder="Email"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <InputRightElement>
          <Icon as={AtSymbolIcon} my={"auto"} color={"#8592a4"} />
        </InputRightElement>
      </InputGroup>

      {/* -----------------Password----------------- */}
      <InputGroup w={"50%"} mb={4}>
        <Input
          type={showPassword ? "text" : "password"}
          size={"md"}
          placeholder="Password"
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <InputRightElement>
          <Button onClick={handleClick} bg={"inherit"} variant={"unstyled"}>
            {showPassword ? (
              <Icon as={EyeSlashIcon} my={"auto"} color={"#8592a4"} />
            ) : (
              <Icon as={EyeIcon} my={"auto"} color={"#8592a4"} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* -----------------Captcha----------------- */}
      <Box
        mb={4}
        bgImage={captchaBackground}
        bgBlendMode={"lighten"}
        borderRadius={"md"}
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          letterSpacing="widest"
          w={150}
          h={12}
          p={2}
          textColor={"black"}
          textAlign={"center"}
          style={{ userSelect: "none" }}
        >
          {captchaCode}
        </Text>
      </Box>
      <InputGroup w={"50%"} mb={4}>
        <Input
          type={"text"}
          size={"md"}
          placeholder="Captcha"
          onChange={(e) => setInputCaptcha(e.target.value)}
        />
        <InputRightElement>
          <Button onClick={refreshCaptcha} bg={"inherit"} variant={"unstyled"}>
            <Icon as={ArrowPathIcon} my={"auto"} color={"#8592a4"} />
          </Button>
        </InputRightElement>
      </InputGroup>
      <Flex
        justifyContent={"space-between"}
        w={"50%"}
        mb={4}
        fontSize={"small"}
      >
        <Checkbox defaultChecked={isChecked} onChange={handleCheck}>
          <Text fontSize={"small"}>Remember Me</Text>
        </Checkbox>
        <Link>Forgot Password?</Link>
      </Flex>
      {/* -----------------Sign In Button----------------- */}
      <Button
        w={"50%"}
        bg={"#0133cc"}
        textColor={"white"}
        type="button"
        onClick={onBtnLogin}
      >
        Sign In
      </Button>
    </Flex>
  );
}

