import { mount, render } from '@vue/test-utils';
import Notification from '../Notification.vue'

describe('Notification', () => {
  it('Should mount props correctly', () => {
    const wrapper = mount(Notification, {
      propsData: {
        notiHeaderBgColor: 'primary',
        notiTitle: 'Pop up',
        notiBody: 'Confirm message',
        isModalShowed: true
      }
    })

    expect(wrapper.props('notiHeaderBgColor')).toBe('primary')
    expect(wrapper.props('notiTitle')).toBe('Pop up')
    expect(wrapper.props('notiBody')).toBe('Confirm message')

    // Expect render props
    expect(wrapper.find('bg-primary'))
    expect(wrapper.find('show'))
    expect(wrapper.find('Pop up'))
    expect(wrapper.find('Confirm message'))
  })
})