const getArgs = (args) => {
  const [executer, file, ...rest] = args;
  // const res = {};
  // rest.forEach((item, idx, array) => {
  //   if (item.startsWith("-")) {
  //     if (idx === array.length - 1) {
  //       res[item.substring(1)] = true;
  //     } else if (!array[idx + 1].startsWith("-")) {
  //       res[item.substring(1)] = array[idx + 1];
  //     } else {
  //       res[item.substring(1)] = true;
  //     }
  //   }
  // });
  // return res;
  return rest.reduce((acc, item, idx, array) => {
    if (item.startsWith("-")) {
      if (idx === array.length - 1) {
        acc[item.substring(1)] = true;
      } else if (!array[idx + 1].startsWith("-")) {
        acc[item.substring(1)] = array[idx + 1];
      } else {
        acc[item.substring(1)] = true;
      }
    }
    return acc;
  }, {});
};

export { getArgs };
