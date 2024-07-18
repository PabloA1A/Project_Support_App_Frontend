import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import RequestListView from '../../views/RequestListView.vue'
import axios from 'axios'
import { flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

vi.mock('axios')

describe('RequestListView', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('renders the component', async () => {
        axios.get.mockResolvedValue({ data: [] })

        const wrapper = shallowMount(RequestListView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.find('.request-list').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toBe('List of Applications')
    })

    it('fetches requests on created', async () => {
        const mockRequests = [
            { id_healthcenter: 1, name: 'Test Request', date: '2024-07-18', subject: 'Test Subject', description: 'Test Description' }
        ]
        axios.get.mockResolvedValue({ data: mockRequests })

        const wrapper = shallowMount(RequestListView)

        await flushPromises()

        await nextTick()

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/healthcenters')
        expect(wrapper.vm.requests).toEqual(mockRequests)
    })

    it('handles API error', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        const axiosError = new Error('API Error')
        axios.get.mockRejectedValue(axiosError)

        const wrapper = shallowMount(RequestListView)

        await flushPromises()

        expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/healthcenters')
        expect(consoleErrorSpy).toHaveBeenCalledWith(axiosError)

        consoleErrorSpy.mockRestore()
    })

    it('renders request items correctly', async () => {
        const mockRequests = [
            { id_healthcenter: 1, name: 'Test Request', date: '2024-07-18', subject: 'Test Subject', description: 'Test Description' }
        ]

        axios.get.mockResolvedValue({ data: mockRequests })

        const wrapper = shallowMount(RequestListView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        await flushPromises()
        await nextTick()

        expect(wrapper.vm.requests).toEqual(mockRequests)
        const requestItem = wrapper.find('.request-item')
        expect(requestItem.exists()).toBe(true)

        if (requestItem.exists()) {
            expect(requestItem.find('h2').text()).toBe('Test Request')
            expect(requestItem.find('p:nth-child(2)').text()).toBe('Date: 2024-07-18')
            expect(requestItem.find('p:nth-child(3)').text()).toBe('Subject: Test Subject')
            expect(requestItem.find('p:nth-child(4)').text()).toBe('Description: Test Description')
        } else {
            throw new Error('Request item not found in the rendered component')
        }
    })

    it('has correct router links', async () => {
        axios.get.mockResolvedValue({ data: [] })

        const wrapper = shallowMount(RequestListView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        await wrapper.vm.$nextTick()

        const routerLinks = wrapper.findAllComponents(RouterLinkStub)
        expect(routerLinks).toHaveLength(2)
        expect(routerLinks[0].props().to).toBe('/new-request')
        expect(routerLinks[1].props().to).toBe('/')
    })

    it('fetches data and renders correctly', async () => {
        const mockRequests = [
            { id_healthcenter: 1, name: 'Test Request', date: '2024-07-18', subject: 'Test Subject', description: 'Test Description' }
        ]

        axios.get.mockResolvedValue({ data: mockRequests })

        const wrapper = shallowMount(RequestListView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        })

        await flushPromises()

        expect(wrapper.vm.requests).toEqual(mockRequests)

        const requestItem = wrapper.find('.request-item')
        expect(requestItem.exists()).toBe(true)

        if (requestItem.exists()) {
            expect(requestItem.find('h2').text()).toBe('Test Request')
            expect(requestItem.find('p:nth-child(2)').text()).toBe('Date: 2024-07-18')
            expect(requestItem.find('p:nth-child(3)').text()).toBe('Subject: Test Subject')
            expect(requestItem.find('p:nth-child(4)').text()).toBe('Description: Test Description')
        } else {
            throw new Error('Request item not found in the rendered component')
        }
    })
})