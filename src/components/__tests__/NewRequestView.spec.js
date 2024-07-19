import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import NewRequestView from '../../views/NewRequestView.vue'
import axios from 'axios'
import { flushPromises } from '@vue/test-utils'

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
    it('renders all form elements correctly', () => {
        const wrapper = shallowMount(NewRequestView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        expect(wrapper.find('input#name').exists()).toBe(true);
        expect(wrapper.find('input#date').exists()).toBe(true);
        expect(wrapper.find('input#subject').exists()).toBe(true);
        expect(wrapper.find('textarea#description').exists()).toBe(true);
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
        expect(wrapper.find('button[type="button"]').exists()).toBe(true);
        expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(true);
    });

    it('correctly binds input data', async () => {
        const wrapper = shallowMount(NewRequestView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        const nameInput = wrapper.find('input#name');
        await nameInput.setValue('New Name');
        expect(wrapper.vm.request.name).toBe('New Name');

        const dateInput = wrapper.find('input#date');
        await dateInput.setValue('2024-07-19');
        expect(wrapper.vm.request.date).toBe('2024-07-19');

        const subjectInput = wrapper.find('input#subject');
        await subjectInput.setValue('New Subject');
        expect(wrapper.vm.request.subject).toBe('New Subject');

        const descriptionTextarea = wrapper.find('textarea#description');
        await descriptionTextarea.setValue('New Description');
        expect(wrapper.vm.request.description).toBe('New Description');
    });

    it('handles create request error with different error types', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error');

        const mockRequest = {
            name: 'Test Name',
            date: '2024-07-18',
            subject: 'Test Subject',
            description: 'Test Description',
        };

        const axiosError = { response: { status: 500, data: 'Internal Server Error' } };
        axios.post.mockRejectedValue(axiosError);

        const wrapper = shallowMount(NewRequestView, {
            global: {
                mocks: {
                    $router: {
                        push: vi.fn(),
                    },
                },
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        wrapper.setData({ request: mockRequest });

        await wrapper.find('form').trigger('submit.prevent');

        await flushPromises();

        expect(axios.post).toHaveBeenCalledWith('/healthcenters', mockRequest);
        expect(consoleErrorSpy).toHaveBeenCalledWith(axiosError);

        consoleErrorSpy.mockRestore();
    });

    it('verifies DOM changes after actions', async () => {
        const wrapper = shallowMount(NewRequestView, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub,
                },
            },
        });

        const nameInput = wrapper.find('input#name');
        await nameInput.setValue('Updated Name');

        expect(wrapper.find('input#name').element.value).toBe('Updated Name');
    });
});