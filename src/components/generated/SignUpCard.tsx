import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";
type SignUpCardProps = {
  onSignUp?: (name: string, email: string, password: string) => Promise<void> | void;
  onSignIn?: () => void;
};

// @component: SignUpCard
export const SignUpCard = (props: SignUpCardProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    if (!password) return {
      strength: 0,
      label: '',
      color: ''
    };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    if (strength <= 2) return {
      strength,
      label: 'Weak',
      color: '#ef4444'
    };
    if (strength <= 3) return {
      strength,
      label: 'Fair',
      color: '#f59e0b'
    };
    if (strength <= 4) return {
      strength,
      label: 'Good',
      color: '#ced57f'
    };
    return {
      strength,
      label: 'Strong',
      color: '#22c55e'
    };
  }, [password]);

  // Validation
  const errors = useMemo(() => {
    const errs: Record<string, string> = {};
    if (touched.name && !name.trim()) {
      errs.name = 'Full name is required';
    }
    if (touched.email && !email.trim()) {
      errs.email = 'Email is required';
    } else if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid email format';
    }
    if (touched.password && !password) {
      errs.password = 'Password is required';
    } else if (touched.password && password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }
    if (touched.confirmPassword && !confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (touched.confirmPassword && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    return errs;
  }, [name, email, password, confirmPassword, touched]);
  const isFormValid = useMemo(() => {
    return name.trim() && email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8 && password === confirmPassword && agreedToTerms;
  }, [name, email, password, confirmPassword, agreedToTerms]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched for validation
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });
    if (!isFormValid) return;
    setIsLoading(true);
    try {
      if (props.onSignUp) {
        await props.onSignUp(name, email, password);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (showTermsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showTermsModal]);

  // @return
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} className="w-full max-w-md">
      <div className="bg-card rounded-xl shadow-xl p-8 border border-border">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-card-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">Enter details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} onBlur={() => handleBlur('name')} placeholder="John Doe" required className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" style={{
              color: '#000000'
            }} />
            </div>
            {errors.name && <motion.p initial={{
            opacity: 0,
            y: -5
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                <span>{errors.name}</span>
              </motion.p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => handleBlur('email')} placeholder="you@example.com" required className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" style={{
              color: '#000000'
            }} />
            </div>
            {errors.email && <motion.p initial={{
            opacity: 0,
            y: -5
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                <span>{errors.email}</span>
              </motion.p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-card-foreground">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} onBlur={() => handleBlur('password')} placeholder="Create a strong password" required className="w-full pl-10 pr-12 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && <motion.div initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Password strength:</span>
                  <span className="text-xs font-medium" style={{
                color: passwordStrength.color
              }}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{
                width: 0
              }} animate={{
                width: `${passwordStrength.strength / 5 * 100}%`
              }} transition={{
                duration: 0.3
              }} className="h-full rounded-full" style={{
                backgroundColor: passwordStrength.color
              }} />
                </div>
              </motion.div>}

            {errors.password && <motion.p initial={{
            opacity: 0,
            y: -5
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                <span>{errors.password}</span>
              </motion.p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2" style={{
          borderWidth: "0px",
          borderStyle: "solid",
          borderColor: "#ffffff",
          borderRadius: "0px"
        }}>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-card-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onBlur={() => handleBlur('confirmPassword')} placeholder="Confirm your password" required className="w-full pl-10 pr-12 py-3 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors">
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            {confirmPassword && password === confirmPassword && !errors.confirmPassword && <motion.p initial={{
            opacity: 0,
            y: -5
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-xs text-green-500 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>Passwords match</span>
              </motion.p>}

            {errors.confirmPassword && <motion.p initial={{
            opacity: 0,
            y: -5
          }} animate={{
            opacity: 1,
            y: 0
          }} className="text-xs text-red-500 flex items-center gap-1">
                <XCircle className="h-3 w-3" />
                <span>{errors.confirmPassword}</span>
              </motion.p>}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2 pt-2">
            <input type="checkbox" id="terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-2 focus:ring-primary cursor-pointer" required />
            <label htmlFor="terms" className="text-sm text-card-foreground cursor-pointer">
              <span>I agree to the </span>
              <button type="button" onClick={() => setShowTermsModal(true)} className="text-primary hover:underline font-medium" style={{
              color: '#ced57f'
            }}>
                Terms & Conditions
              </button>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button type="submit" disabled={isLoading || !isFormValid} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <React.Fragment>
                <UserPlus className="h-5 w-5" />
                <span style={{
              color: "#ffffff",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "rgb(226, 232, 240)",
              borderRadius: "0px"
            }}>Create Account</span>
              </React.Fragment>}
          </motion.button>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground" style={{
          color: '#ffffff'
        }}>
            <span>Already have an account? </span>
            <button type="button" onClick={props.onSignIn} className="text-primary hover:underline font-medium" style={{
            color: '#ced57f'
          }}>
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20"
          onClick={() => setShowTermsModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-border"
          >
            <div className="p-6 overflow-y-auto max-h-[80vh] space-y-4 text-card-foreground">
              <h2 className="text-2xl font-bold text-card-foreground">Terms & Conditions</h2>

              <h3 className="text-xl font-semibold">BOR Systems Fulfillment Policy</h3>

              <p className="text-sm">
                At BOR Systems, we are committed to providing our customers with exceptional service and timely delivery of our online coaching services. Please read our fulfillment policy to understand how we process and deliver our coaching programs:
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold">Order Processing:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>Order Confirmation:</strong> Upon placing an order for our online coaching services, you will receive an email confirmation with the details of your purchase.</li>
                  <li><strong>Processing Time:</strong> Our team will begin processing your order immediately. Please allow up to 24 hours for the processing of your order during regular business days.</li>
                  <li><strong>Custom Orders:</strong> For customized coaching programs, our team will reach out to you directly to discuss your requirements and provide an estimated delivery timeline.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Delivery Methods:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>Digital Delivery:</strong> Our coaching programs are delivered digitally through our online platform. Upon completion of the order processing, you will receive access instructions via email.</li>
                  <li><strong>Online Access:</strong> You will gain immediate access to your purchased coaching program through your designated account on our website.</li>
                  <li><strong>Support:</strong> Our customer support team is available to assist you with any questions or concerns regarding the delivery process. Please feel free to reach out to us at [Customer Support Email] or [Customer Support Phone Number].</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Delivery Timeframes:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>Instant Access:</strong> Many of our coaching programs offer instant access upon purchase. You will receive access instructions shortly after completing your order.</li>
                  <li><strong>Customized Programs:</strong> For customized coaching programs, delivery times may vary depending on the complexity of the program. Our team will provide you with an estimated delivery timeline during the order confirmation process.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Cancellation:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>Cancellation Policy:</strong> You can stop all future payments and leave the program at any time. If you feel you want to leave the program, please contact Nick directly to set up a call to discuss this.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Contact Us:</h4>
                <p className="text-sm">
                  If you have any questions or concerns about our fulfillment policy, please don't hesitate to contact us at <a href="mailto:nick@producer.systems" className="text-primary hover:underline" style={{ color: '#ced57f' }}>nick@producer.systems</a> or <a href="tel:207-500-5429" className="text-primary hover:underline" style={{ color: '#ced57f' }}>207-500-5429</a>. Our team is here to assist you and ensure that you have a positive experience with BOR Systems.
                </p>
              </div>

              <div className="pt-4 pb-2">
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>;
};
