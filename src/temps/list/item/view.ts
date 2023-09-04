let _itemView=(name:string,subName:string)=>`
import 'package:flutter/material.dart';
import 'package:tl_package/tl_package.dart';

import 'logic.dart';
import 'state.dart';

class ${name}ItemView extends GetSView<${name}ItemState,${name}ItemLogic> {
  const ${name}ItemView({super.tag, super.key}) ;

  @override
  Widget build(BuildContext context) {
    //todo coding view
    return Container();
  }
}
`;

export var itemView=_itemView;