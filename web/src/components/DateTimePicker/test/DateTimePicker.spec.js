import { shallowMount } from '@vue/test-utils'
import DateTimePicker from '../DateTimePicker.vue'

describe('DateTimePicker', () => {
    it('should get data from parent', async () => {
        const wrapper = shallowMount(DateTimePicker, {
            propsData: {
                dateTimePickerTitle: "Start Date"
            }
        })

        expect(wrapper.html().includes("Start Date")).toBe(true)
    })
})