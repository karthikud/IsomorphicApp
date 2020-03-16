import React from "react";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import App from "../components/App";
import ProductDialog from "../components/productDialog";
import ProductGridList from "../components/productGridList";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";

describe("App", () => {
  test("snapshot renders", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("find card media in grid", () => {
    const wrapper = shallow(<ProductGridList />);
    expect(wrapper.find(Container)).toHaveLength(1);
  });

  test("check productDialog", () => {
    const wrapper = shallow(<ProductDialog show="true" data="{name:test}" />);

    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
});
