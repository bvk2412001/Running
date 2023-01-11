class Configs{
   public static NUMBER_TRANSLATE_LEFT : number = 2.5;
   public static NUMBER_TRANSLATE_RIGHT = -1.5;
   public static NUMBER_TRANSLATE_UP = 2.5;
}

enum CharacterAnimationName{
    jump,
    run,
    defaults
}

enum CharacterAction{
    UP,
    RIGHT,
    LEFT,
    RUN
}




export{Configs, CharacterAnimationName, CharacterAction}