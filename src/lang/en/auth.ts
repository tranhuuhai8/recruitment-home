export default {
    login: 'Login',
    logout: 'Logout',
    forgot_password: 'Forgot password',
    change_password: 'Change password',
    reset_password: 'Update password',
    register: 'Register',
    notify: {
        token_failed: 'Your session has expired. Please log in again!',
        permission_denied: 'Account does not have access',
        change_password: {
            success: 'Password changed successfully. Please log in again!',
        },
        forgot_password: {
            success: 'Please check your email',
        },
    },
    labels: {
        name: 'Name',
        role: 'Role',
        mail_address: 'Email',
        old_password: 'Old password',
        new_password: 'New password',
        password: 'Password',
        password_confirmation: 'Confirm password',
    },
    role: {
        admin: 'Admin',
        applicant: 'Applicant',
        company: 'Company',
    },
    btn: {
        suggest_register: "Don't have an account?",
        suggest_login: 'Have already an account?',
    },
    verify_email: {
        success_title: 'Account Verified Successfully!',
        success_description:
            'Your account has been activated. Redirecting to login in {seconds} seconds...',
        error_title: 'Invalid Verification Link',
        error_description:
            'The verification link has expired or is invalid. Please register again to receive a new link.',
        btn_login: 'Go to Login',
        btn_register: 'Register Again',
    },
}
