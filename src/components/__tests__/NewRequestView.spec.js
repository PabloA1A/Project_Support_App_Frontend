import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import NewRequestView from '../../views/NewRequestView.vue'
import axios from 'axios'
import { flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

vi.mock('axios')

describe('NewRequestView', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('renders the component', () => {
        const wrapper = shallowMount(NewRequestView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        expect(wrapper.find('.new-request').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toBe('Create a New Request')
    })

    it('initializes with correct data properties', () => {
        const wrapper = shallowMount(NewRequestView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        const today = new Date()
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

        expect(wrapper.vm.request.name).toBe('')
        expect(wrapper.vm.request.date).toBe(formattedDate)
        expect(wrapper.vm.request.subject).toBe('')
        expect(wrapper.vm.request.description).toBe('')
    })

    it('formats date correctly', () => {
        const wrapper = shallowMount(NewRequestView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        const testDate = new Date('2024-07-18')
        const formattedDate = wrapper.vm.formatDate(testDate)

        expect(formattedDate).toBe('2024-07-18')
    })

    it('resets form data when resetForm method is called', () => {
        const wrapper = shallowMount(NewRequestView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        wrapper.setData({
            request: {
                name: 'Test Name',
                date: '2024-07-18',
                subject: 'Test Subject',
                description: 'Test Description'
            }
        })

        wrapper.vm.resetForm()

        expect(wrapper.vm.request.name).toBe('')
        expect(wrapper.vm.request.date).toBe(wrapper.vm.formatDate(new Date()))
        expect(wrapper.vm.request.subject).toBe('')
        expect(wrapper.vm.request.description).toBe('')
    })

    it('creates a request when createRequest method is called', async () => {
        const mockRequest = {
            name: 'Test Name',
            date: '2024-07-18',
            subject: 'Test Subject',
            description: 'Test Description'
        }

        axios.post.mockResolvedValue({})

        const $router = {
            push: vi.fn()
        }

        const wrapper = shallowMount(NewRequestView, {
            global: {
                mocks: {
                    $router
                },
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        wrapper.setData({ request: mockRequest })

        await wrapper.find('form').trigger('submit.prevent')

        await flushPromises()

        expect(axios.post).toHaveBeenCalledWith('/healthcenters', mockRequest)
        expect($router.push).toHaveBeenCalledWith('/requests')
    })

    it('handles create request error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error')

        const mockRequest = {
            name: 'Test Name',
            date: '2024-07-18',
            subject: 'Test Subject',
            description: 'Test Description'
        }

        const axiosError = new Error('Create request error')
        axios.post.mockRejectedValue(axiosError)

        const wrapper = shallowMount(NewRequestView, {
            global: {
                mocks: {
                    $router: vi.fn()  
                },
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        wrapper.setData({ request: mockRequest })

        await wrapper.find('form').trigger('submit.prevent')

        await flushPromises()

        expect(axios.post).toHaveBeenCalledWith('/healthcenters', mockRequest)
        expect(consoleErrorSpy).toHaveBeenCalledWith(axiosError)

        consoleErrorSpy.mockRestore()
    })
})