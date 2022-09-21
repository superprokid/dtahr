import { mount } from '@vue/test-utils'
import Table from '../Table.vue'

describe('Table', () => {
  it('should throw an error if tableHeader do not match tableBody record', () => {
    try {
      const wrapper = mount(Table, {
        propsData: {
          sortBy: 'requestDate',
          tableHeight: "'50vh'",
          tableHeader: [

            "Leave Date",
            "Reason",
            "Status"
          ],
          tableBody: [{
            requestDate: '2021/07/07',
            leaveDate: '2021/07/08',
            leaveReason: 'Sick',
            requestStatus: 'Submitted',
          },

          {
            requestDate: '2021/07/07',
            leaveDate: '2021/07/08',
            leaveReason: 'Accident',
            requestStatus: 'Submitted',
          },
          ],
        }
      })
    } catch (error) {
      expect(error.message).toContain('tableHeader and tableBody record do not match')
    }

  })

  it('should throw an error if sortBy do not match any tableBody record', () => {
    try {
      const wrapper = mount(Table, {
        propsData: {
          sortBy: 'unset',
          tableHeight: "'50vh'",
          tableHeader: [
            "Request Date",
            "Leave Date",
            "Reason",
            "Status"
          ],
          tableBody: [{
            requestDate: '2021/07/07',
            leaveDate: '2021/07/08',
            leaveReason: 'Sick',
            requestStatus: 'Submitted',
          },

          {
            requestDate: '2021/07/07',
            leaveDate: '2021/07/08',
            leaveReason: 'Accident',
            requestStatus: 'Submitted',
          },
          ],
        }
      })
    } catch (error) {
      expect(error.message).toContain('sortBy must match tabbleBody record keys')
    }
  })

  it('should throw an error if sortBy do not match any tableBody record', () => {
    const wrapper = mount(Table, {
      propsData: {
        isEditable: true,
        sortBy: 'requestDate',
        tableHeight: "'50vh'",
        tableHeader: [
          "Request Date",
          "Leave Date",
          "Reason",
          "Status"
        ],
        tableBody: [{
          requestDate: '2021/07/07',
          leaveDate: '2021/07/08',
          leaveReason: 'Sick',
          requestStatus: 'Submitted',
        },

        {
          requestDate: '2021/07/07',
          leaveDate: '2021/07/08',
          leaveReason: 'Accident',
          requestStatus: 'Submitted',
        },
        ],
      }
    })
    // Check isEditable
    expect(wrapper.find('input'))

    //Check props
    expect(wrapper.props('sortBy')).toBe('requestDate')
    expect(wrapper.props('tableHeight')).toBe("'50vh'")
    expect(wrapper.find('Leave Date'))
    expect(wrapper.find('Accident'))
  })
})