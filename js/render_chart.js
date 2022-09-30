const renderChart = (layout) => {
    var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;

    // Map through qMatrix to format it as array of arrays: [[region1, revenue1], [region2, revenue2] ...]
    const columnsArray = qMatrix.map((arr) => [arr[0].qText, arr[1].qNum]);

    c3.generate({
      bindTo: "#chart",
      data: {
        columns: columnsArray,
        type: 'donut'
      },
      donut: {
          title: "Revenue by Region"
      }
    });
  }