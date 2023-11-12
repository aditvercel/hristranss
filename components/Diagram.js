"use client";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  faUserPlus,
  faUserSlash,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { OrgDiagram } from "basicprimitivesreact";
import {
  LCA,
  Tree,
  PageFitMode,
  Enabled,
  TextOrientationType,
} from "basicprimitives";

class Diagram extends Component {
  constructor(props) {
    super(props);

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.onCancelButtonClick = this.onCancelButtonClick.bind(this);
    this.onAddRootButtonClick = this.onAddRootButtonClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      cursorItem: 0,
      isEdit: false,
      highlightItem: 0,
      editItemTitle: "", // Add editItemTitle state
      editItemDescription: "", // Add editItemDescription state
      editGroupTitle: "",
      searchQuery: "", // Add searchQuery state
      items: [
        {
          id: 0,
          parent: null,
          title: "James Smith",
          groupTitle: "",
          description: "VP, Public Sector",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB14jFyLncPZ0YvLnVXmCeY9xBl5ipXWzPQ&usqp=CAU",
        },
      ],
    };

    this.index = this.state.items.length;
  }

  onAddButtonClick(itemConfig) {
    const { items } = this.state;

    var newItem = {
      id: this.index++,
      parent: itemConfig.id,
      title: "New Title",
      description: "New Description",
      groupTitle: "Group Name",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB14jFyLncPZ0YvLnVXmCeY9xBl5ipXWzPQ&usqp=CAU",
    };

    this.setState({
      items: [...items, newItem],
      cursorItem: newItem.id,
    });
  }
  onSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
  }
  onRemoveButtonClick(itemConfig) {
    const { items } = this.state;

    // Check if there is only one item left, if yes, prevent removal
    if (items.length <= 1) {
      alert("Cannot remove the last item.");
      return;
    }

    this.setState(this.getDeletedItems(items, [itemConfig.id]));
  }

  onEditButtonClick(itemConfig) {
    this.setState({
      isEdit: true,
      cursorItem: itemConfig.id,
      editItemTitle: itemConfig.title,
      editItemDescription: itemConfig.description,
      editGroupTitle: itemConfig.groupTitle,
    });
  }

  onSaveButtonClick() {
    const {
      items,
      cursorItem,
      editItemTitle,
      editItemDescription,
      editGroupTitle,
    } = this.state;

    if (!editItemTitle || !editItemDescription) {
      alert("Please enter both title and description.");
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === cursorItem
        ? {
            ...item,
            title: editItemTitle,
            description: editItemDescription,
            groupTitle: editGroupTitle,
          }
        : item
    );

    this.setState({
      items: updatedItems,
      isEdit: false,
      editItemTitle: "",
      editItemDescription: "",
      editGroupTitle: "",
    });
  }

  onCancelButtonClick() {
    this.setState({
      isEdit: false,
      editItemTitle: "",
      editItemDescription: "",
      editGroupTitle: "",
    });
  }

  getDeletedItems(items = [], deletedItems = []) {
    const tree = this.getTree(items);
    const hash = deletedItems.reduce((agg, itemid) => {
      agg.add(itemid.toString());
      return agg;
    }, new Set());
    const cursorParent = this.getDeletedItemsParent(tree, deletedItems, hash);
    const result = [];
    tree.loopLevels(this, (nodeid, node) => {
      if (hash.has(nodeid.toString())) {
        return tree.SKIP;
      }
      result.push(node);
    });

    return {
      items: result,
      cursorItem: cursorParent,
    };
  }

  getDeletedItemsParent(tree, deletedItems, deletedHash) {
    let result = null;
    const lca = LCA(tree);
    result = deletedItems.reduce((agg, itemid) => {
      if (agg == null) {
        agg = itemid;
      } else {
        agg = lca.getLowestCommonAncestor(agg, itemid);
      }
      return agg;
    }, null);

    if (deletedHash.has(result.toString())) {
      result = tree.parentid(result);
    }
    return result;
  }

  getTree(items = []) {
    const tree = Tree();

    // rebuild tree
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      tree.add(item.parent, item.id, item);
    }

    return tree;
  }

  onAddRootButtonClick() {
    const { items } = this.state;

    var newRootItem = {
      id: this.index++,
      parent: null,
      title: "New Root Title",
      description: "New Root Description",
      groupTitle: "Group Name",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIB14jFyLncPZ0YvLnVXmCeY9xBl5ipXWzPQ&usqp=CAU",
    };

    this.setState({
      items: [...items, newRootItem],
      cursorItem: newRootItem.id,
    });
  }
  render() {
    const config = {
      ...this.state,
      pageFitMode: PageFitMode.None,
      hasSelectorCheckbox: Enabled.False,
      cursorItem: 0,
      highlightItem: 0,
      hasButtons: Enabled.True,
      buttonsPanelSize: 50,
      normalLevelShift: 20,
      dotLevelShift: 20,
      lineLevelShift: 10,
      normalItemsInterval: 10,
      dotItemsInterval: 10,
      lineItemsInterval: 4,
      groupTitleOrientation: TextOrientationType.RotateRight,
      onButtonsRender: ({ context: itemConfig }) => {
        return (
          <div className="grid gap-3">
            <button
              key="1"
              className="StyledButton"
              onClick={(event) => {
                event.stopPropagation();
                this.onAddButtonClick(itemConfig);
              }}
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
            <button
              key="2"
              className="StyledButton"
              onClick={(event) => {
                event.stopPropagation();
                this.onEditButtonClick(itemConfig);
              }}
            >
              <FontAwesomeIcon icon={faUserPen} />
            </button>
            <button
              key="3"
              className="StyledButton"
              onClick={(event) => {
                event.stopPropagation();
                this.onRemoveButtonClick(itemConfig);
              }}
            >
              <FontAwesomeIcon icon={faUserSlash} />
            </button>
          </div>
        );
      },
    };

    return (
      <div className="placeholder w-full h-screen">
        <div className="flex">
          <button
            className="border shadow-md rounded-md w-36 h-14"
            onClick={() => this.onAddRootButtonClick()}
          >
            Add Root
          </button>
          {/* search function <TextField
            id="search"
            label="Search"
            variant="outlined"
            onChange={this.onSearchChange}
            value={this.state.searchQuery}
          /> */}
        </div>

        {this.state.isEdit ? (
          <div className="form-container absolute top-0 left-0 right-0 bottom-0 m-auto bg-white flex justify-center align-middle shadow-lg ">
            <div className="grid w-full p-5 shadow-md shadow-black rounded-md">
              <div className="font-bold text-2xl border h-20 items-center flex p-5 shadow-md rounded-lg w-full ">
                Employee Form
              </div>
              <div className=" flex justify-evenly gap-5 relative top-[-60px]">
                <div className="grid w-1/3 gap-5">
                  <TextField
                    id="editItemTitle"
                    label="Nama"
                    variant="outlined"
                    value={this.state.editItemTitle}
                    onChange={(e) =>
                      this.setState({ editItemTitle: e.target.value })
                    }
                    className="w-full"
                  />

                  <TextField
                    id="editGroupTitle"
                    label="Group Name"
                    variant="outlined"
                    value={this.state.editGroupTitle}
                    onChange={(e) =>
                      this.setState({ editGroupTitle: e.target.value })
                    }
                    className="w-full"
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Jabatan
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={this.state.editItemDescription} // Add the value here
                      label="Age"
                      onChange={(e) =>
                        this.setState({ editItemDescription: e.target.value })
                      }
                    >
                      <MenuItem value={"Director"}>Director </MenuItem>
                      <MenuItem value={"Division Head"}>
                        Division Head{" "}
                      </MenuItem>
                      <MenuItem value={"Department Head"}>
                        Department Head{" "}
                      </MenuItem>
                      <MenuItem value={"Section Head"}>Section Head </MenuItem>
                      <MenuItem value={"Staff"}>Staff </MenuItem>
                    </Select>
                  </FormControl>
                  <div className="flex gap-5 justify-between h-16">
                    <button
                      className="border border-red-500 rounded-xl w-36"
                      onClick={() => this.onCancelButtonClick()}
                    >
                      Cancel
                    </button>
                    <button
                      className="border border-green-500 rounded-xl w-36"
                      onClick={() => this.onSaveButtonClick()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <OrgDiagram centerOnCursor={true} config={config} />
        )}
      </div>
    );
  }
}

export default Diagram;
