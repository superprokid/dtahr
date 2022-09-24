import { mount, config } from '@vue/test-utils'
import Login from '../Login.vue'

config.mocks["$t"] = () => {
  return {
    general: {
      appName: "STAFF MANAGEMENT SYSTEM",
      userName: "User Name",
      password: "Password",
      btnLogin: "Log In",
      emptyUserPassword: "*User Name or Password must not be empty",
    }
  }
}

describe('Login', () => {
  it('should have form inputs bound with data model', async() => {
    const wrapper = mount(Login, {
      data() {
        return {
          userName: "NguyenHoangTue",
          password: "03011996"
        }
      },
      propsData: {
        logoPath: "../../assets/logo8x-2.png",
      },

    });

    expect(wrapper.vm.userName).toEqual("NguyenHoangTue")
    expect(wrapper.vm.password).toEqual("03011996")

    //test props
    expect(wrapper.props('logoPath')).toBe('../../assets/logo8x-2.png')
      // Test $t() function
    expect(wrapper.text()).toContain('User Name')
  })
})