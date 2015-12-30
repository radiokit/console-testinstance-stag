import React from 'react';

export default {
  /**
   // This function renders always valid component, regardless if passed
   // argument was component class, already rendered component or nested Object
   // describing structure of multiple components.
   //
   // If it was a class, it creates new instance of the component with
   // props specified as the second argument.
   //
   // If it was already rendered component, it just returns it.
   //
   // If it was an object, it iterates over it and renders each of its
   // values, and return all elements wrapped in <div>. This is useful
   // e.g. for rendering tabs. For example if you pass the following object
   // as the first argument:
   //
   //     {
   //      metadata_schema: {
   //        element: MetadataSchemaPartial, props: {key1: "val1"},
   //      },
   //      tags_schema: {
   //         element: TagsSchemaPartial, props: {},
   //       },
   //     }
   //
   // it will render <div> with two partials inside.
   //
   // In such case, 'key' props of each of nested elements will be set
   // to key of currently iterated value.
   //
   // Optionally you can modify props before rendering by passing function as the
   // third argument. It will get three arguments: key, raw element and props.
   //
   // Optionally you can modify rendered element by passing function as the
   // fourth argument. It will get three arguments: key, rendered element and props.
   */
  renderDelegatedComponent: function(element, props, preRenderCallback, postRenderCallback) {
    if(typeof(element) === "object") {
      if(!this.containsNestedElements(element)) {
        // Single already rendered element
        return element;

      } else {
        // Hash of nested elements
        let nestedElements = Object.keys(element).map((key) => {
          let value = element[key];
          if(!value.hasOwnProperty("element")) {
            throw new Error("Missing 'element' key in one of values of object passed to renderDelegatedComponent, passed object was " + JSON.stringify(element));
          }

          let nestedProps = value.hasOwnProperty("props") ? value.props : {};
          nestedProps.key = key;

          if(typeof(preRenderCallback) === "function") {
            nestedProps = preRenderCallback(key, value.element, nestedProps);
          }

          let renderedElement = this.renderDelegatedComponent(value.element, nestedProps);

          if(typeof(postRenderCallback) === "function") {
            return postRenderCallback(key, renderedElement, nestedProps);
          } else {
            return renderedElement;
          }
        });

        return (
          <div>
            {nestedElements}
          </div>
        );
      }

    } else {
      // Element constructor (class)
      return React.createElement(element, props);
    }
  },


  containsNestedElements: function(element) {
    return typeof(element) === "object" && element.$$typeof !== Symbol.for("react.element");
  }
}
