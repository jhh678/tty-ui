/*
 * @File: 按钮示例
 * @Author: jhh678
 * @Date: 2018-03-28 11:36:09
 * @Last Modified by: jhh678
 * @Last Modified time: 2018-03-28 11:36:32
 */

<template>
  <div class="sub-page-wrap">
    <h1>首页</h1>

    <h3>预定义样式</h3>
    <p>使用下面列出的类可以快速创建一个带有预定义样式的按钮。</p>
    <!-- init button -->
    <button type="button" class="btn">（初始样式）btn</button>

    <!-- Standard button -->
    <button type="button" class="btn btn-default">（默认样式）Default</button>

    <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
    <button type="button" class="btn btn-primary">（首选项）Primary</button>

    <!-- Indicates a successful or positive action -->
    <button type="button" class="btn btn-success">（成功）Success</button>

    <!-- Contextual button for informational alert messages -->
    <button type="button" class="btn btn-info">（一般信息）Info</button>

    <!-- Indicates caution should be taken with this action -->
    <button type="button" class="btn btn-warning">（警告）Warning</button>

    <!-- Indicates a dangerous or potentially negative action -->
    <button type="button" class="btn btn-danger">（危险）Danger</button>

    <!-- Deemphasize a button by making it look like a link while maintaining button behavior -->
    <button type="button" class="btn btn-link">（链接）Link</button>

    <h3>尺寸</h3>
    <p>需要让按钮具有不同尺寸吗？使用 <code>.btn-lg</code>、<code>.btn-sm</code> 或 <code>.btn-xs</code> 就可以获得不同尺寸的按钮。使用<code>.btn-mw</code>设置固定最小宽度120px。</p>
    <button class="btn btn-default btn-sm"><i class="iconfont icon-bangzhu"></i>小按钮</button>
    <button class="btn btn-default btn-sm" disabled><i class="iconfont icon-bangzhu"></i>小按钮</button>
    <button class="btn btn-primary">默认按钮</button>
    <button class="btn btn-mw">固宽</button>

    <h3>鼠标悬停加层样式</h3>
    <div role="button" class="hover-layer">悬停加层</div>
  </div>
</template>

<script>
</script>

<style>

</style>
