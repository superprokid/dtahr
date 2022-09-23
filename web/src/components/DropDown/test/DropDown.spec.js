import { shallowMount } from '@vue/test-utils'
import DropDown from '../DropDown.vue'

describe('DropDown', () => {
    it('should inputs data sent to parent', async () => {
        const wrapper = shallowMount(DropDown)
        wrapper.vm.$emit("selectObject", "admin")
        wrapper.vm.$emit("selectObject", "employee")
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().selectObject).toBeTruthy()
        expect(wrapper.emitted().selectObject.length).toBe(2)
        expect(wrapper.emitted().selectObject[1]).toEqual(["employee"])
    })
})

it('should get data from parent', async () => {
    const wrapper = shallowMount(DropDown, {
        propsData: {
            selectedOptions: [
                {
                    title: "Admin",
                    value: "admin"
                },
                {
                    title: "Employee",
                    value: "employee"
                }
            ]
        }
    })

    expect(wrapper.html().includes("Admin")).toBe(true)
    expect(wrapper.html().includes("Employee")).toBe(true)
})