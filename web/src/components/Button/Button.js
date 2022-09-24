export default {
    name: "Button",
    props: [
        "buttonClass",
        "buttonTitle",
        "disable"
    ],
    methods: {
        onClick() {
            this.$emit("on-click")
        }
    },
}