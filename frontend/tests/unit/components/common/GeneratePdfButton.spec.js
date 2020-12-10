import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import GeneratePdfButton from '@/components/common/GeneratePdfButton.vue';

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('GeneratePdfButton.vue', () => {
  const apiPath = 'apiPath';
  const basePath = 'basePath';
  const formName = 'testform';
  const zeroUuid = '00000000-0000-0000-0000-000000000000';

  it('renders with the correct url link', () => {
    const wrapper = shallowMount(GeneratePdfButton, {
      localVue,
      mocks: {
        $config: {
          apiPath: apiPath,
          basePath: basePath
        }
      },
      propsData: {
        formName: formName,
        submissionId: zeroUuid
      }
    });
    
    const anchor = wrapper.find('a');
    expect(anchor.exists()).toBeTruthy();
    expect(anchor.attributes('href')).toMatch(`${basePath}/${apiPath}/${formName}/submissions/${zeroUuid}/pdf`);
    expect(anchor.attributes('target')).toBe('_blank');
  });
});
