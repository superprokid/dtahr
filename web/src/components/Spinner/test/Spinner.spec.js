import { mount, config } from '@vue/test-utils'
import Vue from 'vue'
import Spinner from '../Spinner.vue'

config.mocks["$eventBus"] = new Vue()

describe('Spinner', () => {
  it('should show spinner', () => {

    const wrapper = mount(Spinner, {
      data() {
        return {
          isSpinnerShow: true,
        }
      }
    })

    expect(wrapper.html()).toContain('md-progress-spinner')

  })
})