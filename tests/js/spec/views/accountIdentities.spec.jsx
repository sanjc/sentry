import PropTypes from 'prop-types';
import React from 'react';
import {shallow, mount} from 'enzyme';

import {Client} from 'app/api';
import AccountIdentities from 'app/views/settings/account/accountIdentities';

const ENDPOINT = '/users/me/social-identities/';

describe('AccountIdentities', function() {
  beforeEach(function() {
    Client.clearMockResponses();
  });

  it('renders empty', function() {
    Client.addMockResponse({
      url: ENDPOINT,
      method: 'GET',
      body: [],
    });

    let wrapper = shallow(<AccountIdentities />, {
      context: {
        router: TestStubs.router(),
      },
      childContextTypes: {
        router: PropTypes.object,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders list', function() {
    Client.addMockResponse({
      url: ENDPOINT,
      method: 'GET',
      body: [
        {
          id: '1',
          provider: 'github',
          provider_label: 'Github',
        },
      ],
    });

    let wrapper = shallow(<AccountIdentities />, {
      context: {
        router: TestStubs.router(),
      },
      childContextTypes: {
        router: PropTypes.object,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('disconnects identity', function() {
    Client.addMockResponse({
      url: ENDPOINT,
      method: 'GET',
      body: [
        {
          id: '1',
          provider: 'github',
          provider_label: 'Github',
        },
      ],
    });

    let wrapper = mount(<AccountIdentities />, {
      context: {
        router: TestStubs.router(),
      },
      childContextTypes: {
        router: PropTypes.object,
      },
    });

    let disconnectRequest = {
      url: `${ENDPOINT}1/`,
      method: 'DELETE',
    };

    let mock = Client.addMockResponse(disconnectRequest);

    expect(mock).not.toHaveBeenCalled();

    wrapper
      .find('Button')
      .first()
      .simulate('click');

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith(
      `${ENDPOINT}1/`,
      expect.objectContaining({
        method: 'DELETE',
      })
    );
  });
});
