/**
 * 下拉框模糊匹配
 *  1 文字全拼
 *  2 文字包含某个拼音
 *  3 首字母缩写
 */
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { ConvertPinyin } from '../../utils/pinyin';
import { makePy } from '../../utils/initials';

const FilterSelect = props => {
  return (
    <Select
      {...props}
      showSearch
      filterOption={(input, option) => {
        let result;
        if (escape(input).indexOf('%u') != -1) {
          //汉字
          result = option.children.indexOf(input) > -1;
        } else {
          let len = input.length;
          let text = option.children || '';
          if (
            !(text instanceof String) ||
            (typeof text).toLowerCase() !== 'string'
          ) {
            text = text.toString();
          }
          let inputLower = input.toLowerCase();
          result =
            ConvertPinyin(text).indexOf(inputLower) > -1 || // 全拼或中间字包含
            makePy(text)[0]
              .toLowerCase()
              .substring(0, len) === inputLower || // 首字母缩写
            text.toLowerCase().indexOf(inputLower) > -1;
        }
        return result;
      }}
    ></Select>
  );
};
export default FilterSelect;
