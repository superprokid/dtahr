import { mount, shallowMount } from '@vue/test-utils'
import TabNav from '../TabNav.vue'
import EmployeeListScreen from "../../../views/AdminSite/EmployeeTab/EmployeeListScreen.vue"

describe('TabNav', () => {
    it('should get tabName correctly', () => {
        const wrapper = mount(TabNav, {
            propsData: {
                tabItems: [
                    {
                        tabName: "TAB 1",
                        tabContent: "EmployeeListScreen",
                    },
                    {
                        tabName: "TAB 2",
                        tabContent: "EmployeeWorkLogScreen",
                    },
                ]
            }
        })

        expect(wrapper.props().tabItems[0].tabName).toBe('TAB 1')
        wrapper.destroy();
    })
})

it('renders a tab item', () => {
    const wrapper = shallowMount(TabNav, {
        propsData: {
            tabItems: [
                {
                    tabName: "TAB 1",
                    tabContent: "EmployeeListScreen",
                },
                {
                    tabName: "TAB 2",
                    tabContent: "EmployeeWorkLogScreen",
                },
            ]
        }
    })
    expect(wrapper.html().includes("<employeelistscreen>")).toBe(true)
})
