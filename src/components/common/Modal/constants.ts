export const PROPS_MODAL = {
    title: {
        type: String,
        default: '',
    },
    formId: {
        type: String,
        default: '',
    },
    open: {
        type: Boolean,
        default: false,
    },
    hasFooter: {
        type: Boolean,
        default: true,
    },
    centered: {
        type: Boolean,
        default: true,
    },
    closable: {
        type: Boolean,
        default: true,
    },
    maskClosable: {
        type: Boolean,
        default: false,
    },
    width: {
        type: [String, Number],
        default: '',
    },
    buttonDirection: {
        type: String,
        default: '',
    },
    okText: {
        type: String,
        default: '',
    },
    cancelText: {
        type: String,
        default: '',
    },
    wrapClassName: {
        type: String,
        default: '',
    },
}
