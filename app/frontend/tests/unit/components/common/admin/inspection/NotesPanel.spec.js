import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import NotesPanel from '@/components/common/admin/inspection/NotesPanel.vue';
import commonFormService from '@/services/commonFormService';
import { FormNames } from '@/utils/constants';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('NotesPanel.vue', () => {
  const formName = FormNames.MINESOPERATORSCREENING;
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  const mockConsoleError = jest.spyOn(console, 'error');
  const getNotesSpy = jest.spyOn(commonFormService, 'getNotes');
  const addNoteSpy = jest.spyOn(commonFormService, 'addNote');

  let store;

  beforeEach(() => {
    mockConsoleError.mockReset();
    getNotesSpy.mockReset();
    addNoteSpy.mockReset();
    store = new Vuex.Store();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('renders without reviewer privileges', () => {
    getNotesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        hasResourceRoles: () => () => false
      }
    });

    const wrapper = shallowMount(NotesPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });

    expect(wrapper.text()).toMatch('Notes');
    expect(getNotesSpy).toHaveBeenCalledTimes(1);
  });

  it('renders with reviewer privileges', () => {
    getNotesSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(NotesPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });

    expect(wrapper.text()).toMatch('Notes');
    expect(getNotesSpy).toHaveBeenCalledTimes(1);
  });

  it('getNotes can set an error message', async () => {
    const testMsg = 'testErrorMsg';
    getNotesSpy.mockImplementation(() => {
      throw new Error(testMsg);
    });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(NotesPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    await wrapper.vm.getNotes();

    expect(wrapper.text()).toMatch('Notes');
    expect(wrapper.text()).toMatch('NEW NOTE');
    expect(wrapper.vm.error).toMatch(testMsg);
    expect(wrapper.vm.loading).toBeFalsy();
    expect(getNotesSpy).toHaveBeenCalledTimes(2);
  });

  it('addNote can add a new note', async () => {
    getNotesSpy.mockResolvedValue({ data: [{}] });
    addNoteSpy.mockResolvedValue({ data: [{}] });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(NotesPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    await wrapper.vm.addNote();

    expect(wrapper.text()).toMatch('Notes');
    expect(wrapper.vm.error).toBeFalsy();
    expect(wrapper.vm.newNote).toBeFalsy();
    expect(wrapper.vm.showNoteField).toBeFalsy();
    expect(getNotesSpy).toHaveBeenCalledTimes(2);
    expect(addNoteSpy).toHaveBeenCalledTimes(1);
  });

  it('addNote can handle an empty response from the API', async () => {
    getNotesSpy.mockResolvedValue({ data: [{}] });
    addNoteSpy.mockResolvedValue({});
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(NotesPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    await wrapper.vm.addNote();

    expect(wrapper.text()).toMatch('Notes');
    expect(wrapper.vm.error).toMatch('An error occured while trying to add the note');
    expect(getNotesSpy).toHaveBeenCalledTimes(1);
    expect(addNoteSpy).toHaveBeenCalledTimes(1);
    expect(mockConsoleError).toHaveBeenCalledTimes(1);
  });

  it('addNote can set an error message', async () => {
    const testMsg = 'testErrorMsg';
    getNotesSpy.mockResolvedValue({ data: [{}] });
    addNoteSpy.mockImplementation(() => {
      throw new Error(testMsg);
    });
    store.registerModule('auth', {
      namespaced: true,
      getters: {
        fullName: () => 'fullName',
        hasResourceRoles: () => () => true
      }
    });

    const wrapper = shallowMount(NotesPanel, {
      localVue,
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      },
      store
    });
    await wrapper.vm.addNote();

    expect(wrapper.text()).toMatch('Notes');
    expect(wrapper.vm.error).toMatch('An error occured while trying to add the note');
    expect(getNotesSpy).toHaveBeenCalledTimes(1);
    expect(addNoteSpy).toHaveBeenCalledTimes(1);
    expect(mockConsoleError).toHaveBeenCalledTimes(1);
  });
});
