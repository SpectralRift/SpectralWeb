const enum ShaderType {
    SHADER_TYPE_UNKNOWN,
    SHADER_TYPE_VERTEX,
    SHADER_TYPE_FRAGMENT
};

interface IShader {
    compile() : boolean;
    destroy() : void;
    setSource(source: string, type: ShaderType) : void;
    getCompileLog() : string;
    isCompiled() : boolean;
};

export { IShader, ShaderType };