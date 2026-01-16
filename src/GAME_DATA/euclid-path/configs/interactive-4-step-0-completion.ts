export default (interactiveResponses: Record<string, Record<string, string | number | boolean | null>>) => {
    return !(interactiveResponses?.['8_0']?.['step-0-completed'] === true);
};