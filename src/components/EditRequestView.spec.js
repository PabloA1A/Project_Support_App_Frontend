import EditRequestView from '@/views/EditRequestView.vue';
import { RouterLinkStub, shallowMount } from '@vue/test-utils';
import axios, { Axios } from 'axios';
import { beforeEach, describe, expect, vi } from 'vitest';

vi.mock('axios');

describe('EditRequestView', () => {
  const mockRouteParams = { id: 1 };
  const mockRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component', async () => {
    const mockData = {
      id_healthcenter: 1,
      name: 'Test Request',
      date: '2024-07-18',
      subject: 'Test Subject',
      description: 'Test Description',
    };

    axios.get.mockResolvedValue({ data: mockData });

    const wrapper = await shallowMount(EditRequestView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        stubs: {
          RouterLink: true,
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('Edit Request');
    expect(wrapper.find('form.request-form').exists()).toBe(true);

    expect(wrapper.vm.request.value.name).toBe(mockData.name);
    expect(wrapper.vm.request.value.date).toBe(mockData.date); 
    expect(wrapper.vm.request.value.subject).toBe(mockData.subject);
    expect(wrapper.vm.request.value.description).toBe(mockData.description);
  });
  
});