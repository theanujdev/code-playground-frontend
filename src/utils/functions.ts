function debounce(func: () => void, wait: number, immediate: any) {
  var timeout: NodeJS.Timeout | null;

  return function executedFunction(this: any) {
    var context = this;
    var args: any = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout!);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export { debounce };
