const merge = (...args) => args.reduce(
    (dst, arg) =>  ({...arg, ...dst})
);

module.exports = merge;