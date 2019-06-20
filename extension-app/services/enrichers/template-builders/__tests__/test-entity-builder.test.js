import TestEntityBuilder from '../test-entity-builder';

describe('TestEntityBuilder', () => {
  it('Should build the enriched message', () => {
    expect(TestEntityBuilder.build()).toMatchSnapshot();
  });
});
