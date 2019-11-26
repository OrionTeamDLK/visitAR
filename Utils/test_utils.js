

// TO BE INCLUDED IN EVERY TEST FILE FOR COMPONENT TESTING.

export const findByTestAtt = (component, att) => {
  const wrapper = component.find(`[data-test='${att}']`);
  return wrapper;
}
