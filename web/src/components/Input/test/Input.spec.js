import { shallowMount } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Input', () => {
    it('should inputs data sent to parent', async () => {
        const wrapper = shallowMount(Input)
        wrapper.vm.$emit("NguyenHoangTue")
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().NguyenHoangTue).toBeTruthy()
    })
})

it('should get data from parent', async () => {
    const wrapper = shallowMount(Input, {
        propsData: {
            inputTitle: "User Name"
        }
    })

    expect(wrapper.html().includes("User Name")).toBe(true)
})