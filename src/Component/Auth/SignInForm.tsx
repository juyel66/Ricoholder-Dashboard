
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
const SignInForm = () => {
    return (
        <div>
            <div className="w-auto max-w-md space-y-8 ">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Welcome!</h2>
        <p className="text-gray-400 text-sm">
          Enter your email and password to sign in 
        </p>
      </div>

      {/* Form Card */}
      <Card className="bg-slate-800/50 lg:w-[350px] border-slate-700 backdrop-blur-sm">
        <CardContent className="p-8 space-y-6">


          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Your password"
              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me Toggle */}
          <div className="flex items-center space-x-3">
            <Switch id="remember" className="data-[state=checked]:bg-blue-500" />
            <Label htmlFor="remember" className="text-white text-sm font-medium">
              Remember me
            </Label>
          </div>

          {/* Sign Up Button */}
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors">
            SIGN IN
          </Button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-white hover:text-blue-400 font-medium transition-colors">Sign Up</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
            
        </div>
    );
};

export default SignInForm;