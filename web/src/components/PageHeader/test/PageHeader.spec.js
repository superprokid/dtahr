import { mount } from '@vue/test-utils'
import PageHeader from '../PageHeader.vue'

describe('PageHeader', () => {
  it('should render Page header content correctly', () => {
    const wrapper = mount(PageHeader, {
      propsData: {
        pageHeaderContent: "Employee Page",
        logoUrl: 'logo.img'
      }
    })

    expect(wrapper.text()).toEqual('Employee Page')
    wrapper.destroy();
  })

  it('should render Logo url content correctly', () => {
    const wrapper = mount(PageHeader, {
      propsData: {
        logoUrl: 'logo.img'
      }
    })

    expect(wrapper.html().includes('logo.img')).toBe(true);
    wrapper.destroy();
  })

  it('should render img and span tag', () => {
    const wrapper = mount(PageHeader, {
      propsData: {
        logoUrl: 'logo.img'
      }
    })
    
    expect(wrapper.findAll('img').exists()).toBe(true)
    expect(wrapper.findAll('span').exists()).toBe(true)
    wrapper.destroy();
  })
})
