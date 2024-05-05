import { test, equal, notEqual } from './test-helpers';
import getConfig from '../src/getConfig';

function mockFetch(status, ok, payload) {
  return jest.fn(() => 
    Promise.resolve({
      ok: ok,
      status: status,
      json: () => Promise.resolve(payload)
    })
  );
}

function testGetConfig() {
  global.fetch = mockFetch(200, true, { key: 'value' }); 
  test("getConfig should correctly parse the JSON from the config file on success", async () => {
    const config = await getConfig();
    equal(config.key, 'value', "getConfig should return the correct object from JSON");
  });

  global.fetch = mockFetch(404, false, null);
  test("getConfig should handle fetch errors and return null", async () => {
    const config = await getConfig();
    equal(config, null, "getConfig should return null on fetch error");
  });
}

testGetConfig();