import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'
import * as vueRouter from 'vue-router'
import EditRequestView from '@/views/EditRequestView.vue'

vi.mock('axios')
vi.mock('vue-router')


describe('EditRequestView', () => {
  let wrapper
  let mockRouter
  let mockRoute

  beforeEach(() => {
    vi.clearAllMocks()

    mockRouter = {
      push: vi.fn()
    }
    mockRoute = {
      params: { id: '1' }
    }

    vi.spyOn(vueRouter, 'useRouter').mockReturnValue(mockRouter)
    vi.spyOn(vueRouter, 'useRoute').mockReturnValue(mockRoute)
  })

  it('fetches request data on mount', async () => {
    const mockData = {
      name: 'Test Request',
      date: '2024-07-19',
      subject: 'Test Subject',
      description: 'Test Description'
    }

    axios.get.mockResolvedValue({ data: mockData })

    wrapper = mount(EditRequestView)

    await flushPromises()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/healthcenters/1')
    expect(wrapper.vm.request).toEqual(mockData)
  })

  it('updates request data', async () => {
    const updatedData = {
      name: 'Updated Request',
      date: '2024-07-20',
      subject: 'Updated Subject',
      description: 'Updated Description'
    }

    axios.put.mockResolvedValue({})

    wrapper = mount(EditRequestView)
    await flushPromises()

    wrapper.vm.request = updatedData
    await wrapper.vm.updateRequest()

    expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/healthcenters/1', updatedData)
    expect(mockRouter.push).toHaveBeenCalledWith('/requests')
  })

  it('deletes request', async () => {
    axios.delete.mockResolvedValue({})

    wrapper = mount(EditRequestView)
    await flushPromises()

    await wrapper.vm.deleteRequest()

    expect(axios.delete).toHaveBeenCalledWith('http://localhost:8080/healthcenters/1')
    expect(mockRouter.push).toHaveBeenCalledWith('/requests')
  })

  it('cancels edit and navigates back', async () => {
    wrapper = mount(EditRequestView)
    await flushPromises()

    await wrapper.vm.cancelEdit()

    expect(mockRouter.push).toHaveBeenCalledWith('/requests')
  })

  it('formats date correctly', () => {
    const date = new Date('2024-07-19T12:00:00Z')
    expect(wrapper.vm.formatDate(date)).toBe('2024-07-19')
  })

  it('handles errors when fetching request', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    axios.get.mockRejectedValue(new Error('Fetch error'))

    await wrapper.vm.getRequest()

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching the request:', expect.any(Error))
    consoleErrorSpy.mockRestore()
  })

  it('handles errors when updating request', async () => {
    console.error = vi.fn()
    axios.put.mockRejectedValue(new Error('Update error'))

    await wrapper.vm.updateRequest()

    expect(console.error).toHaveBeenCalledWith('Error updating the request:', expect.any(Error))
  })

  it('handles errors when deleting request', async () => {
    console.error = vi.fn()
    axios.delete.mockRejectedValue(new Error('Delete error'))

    await wrapper.vm.deleteRequest()

    expect(console.error).toHaveBeenCalledWith('Error deleting the request:', expect.any(Error))
  })
  it('renders all form elements correctly', () => {
    wrapper = mount(EditRequestView);

    expect(wrapper.find('input#name').exists()).toBe(true);
    expect(wrapper.find('input#date').exists()).toBe(true);
    expect(wrapper.find('input#subject').exists()).toBe(true);
    expect(wrapper.find('textarea#description').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    expect(wrapper.find('button.cancel-button').exists()).toBe(true);
    expect(wrapper.find('button.delete-button').exists()).toBe(true);
  });

  it('correctly binds input data', async () => {
    wrapper = mount(EditRequestView);

    const nameInput = wrapper.find('input#name');
    await nameInput.setValue('Updated Name');
    expect(wrapper.vm.request.name).toBe('Updated Name');

    const dateInput = wrapper.find('input#date');
    await dateInput.setValue('2024-07-21');
    expect(wrapper.vm.request.date).toBe('2024-07-21');

    const subjectInput = wrapper.find('input#subject');
    await subjectInput.setValue('Updated Subject');
    expect(wrapper.vm.request.subject).toBe('Updated Subject');

    const descriptionTextarea = wrapper.find('textarea#description');
    await descriptionTextarea.setValue('Updated Description');
    expect(wrapper.vm.request.description).toBe('Updated Description');
  });

  it('verifies DOM changes after actions', async () => {
    wrapper = mount(EditRequestView);

    const nameInput = wrapper.find('input#name');
    await nameInput.setValue('Updated Name');
    expect(wrapper.find('input#name').element.value).toBe('Updated Name');

    const dateInput = wrapper.find('input#date');
    await dateInput.setValue('2024-07-21');
    expect(wrapper.find('input#date').element.value).toBe('2024-07-21');

    const subjectInput = wrapper.find('input#subject');
    await subjectInput.setValue('Updated Subject');
    expect(wrapper.find('input#subject').element.value).toBe('Updated Subject');

    const descriptionTextarea = wrapper.find('textarea#description');
    await descriptionTextarea.setValue('Updated Description');
    expect(wrapper.find('textarea#description').element.value).toBe('Updated Description');
  });

  it('calls formatDate with correct argument', () => {
    wrapper = mount(EditRequestView);
    const formatDateSpy = vi.spyOn(wrapper.vm, 'formatDate');

    const dateString = '2024-07-19';
    wrapper.vm.formatDate(dateString);

    expect(formatDateSpy).toHaveBeenCalledWith(dateString);
  });
});