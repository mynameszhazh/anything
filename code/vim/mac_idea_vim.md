- code

```js
" ================================================================================
" Desc: IntelliJ IDEA ideavim - PyCharm 2023.3.1(CE)
" Redesign : aBenL@zhihu.com
" Create Date: 2023-02-01
" Original Author: chloneda <chloneda@163.com>
" Repository: https://github.com/chloneda/vim-cheatsheet
" Blog: https://www.cnblogs.com/chloneda
" License: MIT
" Ideavim Github: https://github.com/JetBrains/ideavim
" IdeaVim-EasyMotion: https://github.com/AlexPl292/IdeaVim-EasyMotion
" Notes:
"   1. Vim 脚本注释是以 " 开头的，只存在行注释，不存在块注释
"   2. 本文档中的 <Leader> 前缀键默认是 "\" 键，后面改为 Space 空格键
"   3. 本文档按功能、再按按键进行映射设置，力求分类明了，方便记忆
"   4. 插件 Ideavim 在命令模式下输入 :actionlist，查询 IDEA 中所有 action
"   5. 将本文档内容复制到 ~/.ideavimrc 完成自定义配置
" ================================================================================

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Part 1. VIM 本身
" --------------------------------
" Part 1.1. set-通用基本设置
set number                      " 显示行号，缩写：set nu
set relativenumber              " 设置相对行号，缩写：set rnu
set showmode                    " 在底部显示当前模式
set showcmd                     " 在状态栏中显示命令
"不支持 set wrap                        " 设置代码自动折行
"不支持 set foldopen-=hor               " 设置啥时候都不可以打开折叠 hor 就是水平移动 的时候 不要打开折叠
set hlsearch                    " 搜索高亮显示，缩写：set hls
set highlightedyank             " yiw 的时候 短暂的高亮复制 的对象
set ignorecase                  " 搜索时忽略大小写
set incsearch                   " 搜索时立即高亮结果
"不支持 set shiftwidth=4                " 每次缩进是 4 个空格
"不支持 set softtabstop=4               " 每次按 Tab 键输入 4 个空格
set smartcase                   " 有一个或以上大写字母时仍大小写敏感
set clipboard+=unnamed          " Vim 的默认寄存器和系统剪贴板共享
set clipboard+=ideaput          " enable native idea paste action for put operation
set history=200                 " 记录 200 条历史命令，默认是 20 条
set scrolloff=5                " 光标距离顶部和底部 10 行
"不支持 set showtabline=2               " 总是显示标签栏
"不支持 set laststatus=2                " 总是显示状态栏
"不支持 set paste                       " 开启粘贴的模式，？
"不支持 set ruler                       " 显示光标当前位置

"不支持 set encoding=utf-8              " 编码设置，缩写：set enc
"不支持 set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr
"不支持 set fileformats=unix,dos,mac
"不支持 set termencoding=utf-8
"不支持 set formatoptions+=m
"不支持 set formatoptions+=B
set ideavimsupport+=dialog      " 在对话框编辑器中禁用 IdeaVim
    "不支持 set ideaenabledbufs+=singleline
" --------------------------------
" Part 1.2. set- 插件设置
set easymotion                  " Easymotion 插件<C-;>:easymotion-sn
let g:EasyMotion_do_mapping=0
   " 禁用 Easymotion 默认映射

set surround                    " 快捷添加()[]{}'"-=*等一切符合，以及网页标签<>，好用
                                " ysw+符号(单个单词加)、ys3w+符号(3个单词加如： s1,s2 )、ySS+(整行加）
                                " cs+对象符号+新符号(改)、ds+符号(删)、v+选择+S+符号(选择后加)
set argtextobj                  " 快速选中函数的参数，ia-inner，aa-outer，只能选择最外面的函数？？？
let g:argtextobj_pairs="(:),{:},<:>"
    " 设置在(a,b) 、{a,b} 、<a,b> 这种括号里面
set textobj-indent              " 选择相同缩进的对象 vii vai vaI
" --------------------------------
" Part 1.3. set- IntelliJ IDEA 特有基础设置
set ideajoin                    " 智能连接字符串及控制结构等
set ideamarks                   " 触发 IDEA 全局标签
" --------------------------------
" 1.4. let- 全局设置
" 修改 Leader 前缀键为 Space 空格键，默认是"\"，该注释禁止放后面，否则不起作用
let mapleader=' '
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Part 2. 系统或开发平台的快捷命令类
" ================================================================================
" 通用按键映射说明：
"                Normal    Visual    Operator Pending    Insert Only    Command Line
"                常规模式    可视化模式     运算符模式          插入模式         命令行模式
"                              v          d,y,c              i,a            /,:
"map  noremap       X          X            X
"nmap nnoremap      X
"vmap vnoremap                 X
"omap onoremap                              X
"map! noremap!                                               X               X
"imap inoremap                                               X
"cmap cnoremap                                                               X
" 用法说明：   [nore]map [<args>] {lhs} {rhs}
" map前面加了nore 表示非递归映射，递归映射是指rhs会当做lhs再解释一次，
" 非递归映射则不会，即rhs会被放入到Vim最终要处理的字符队列里去
" 比如先后定义了nnoremap x iaa , nmap <F2> x ，那么按F2键相当于执行了按iaa键的功能，
" 如果第二个命令用的是nnoremap <F2> x ，那么按下F2键相当于执行了按下x键的功能
" <args> 表示map命令的一些参数，其中常用的有
"   <buffer> 表示这个映射只是在当前的buffer中定义，而不是定义全局的映射
"   <expr> 表示{rhs}是一个Vim表达式 ，而不是按键序列，如：
"          noremap  <expr>0     col('.') == 1 ? '^': '0'
"   <silent> 表示静默映射，不会显示Vim在处理rhs过程中对界面产生的变化。
" ================================================================================
" --------------------------------
" Part 2.1. 有关VIM的基本设置 vim+
nnoremap <Leader>vs :w<CR>:source ~/.ideavimrc<CR>
    " 重新加载执行ideavimrc的命令，可随便检查各命令是否被执行，出错会提示。
    " :source {file} - Read Ex commands from {file}.  These are commands that start with a ":".
" nnoremap <Leader>vr :action IdeaVim.ReloadVimRc.reload<CR>
    " 重新加载ideavimrc，这个更好。idea自带快捷键：<C-S-O>
nnoremap <Leader>va :action VimActions<CR>
    " Vim 配置操作，相当于右击右下角Vim图标
nmap <Leader>vm <Action>(OpenMinimapSettings)
    " idea 设置
nmap <Leader>vi <Action>(ShowSettings)
    " idea 设置
"待研究 nmap <Leader>ve <Action>(OpenFile C:\Users\Administrator\AppData\Roaming\JetBrains\PyCharmCE2023
.1\options\vim_settings_local.xml) RestartIde<CR>
    " 清理vim的寄存器、搜索等记录，重启py
" --------------------------------
" Part 2.2. 文件、窗口、标签操作 file+
nnoremap <Leader>fs :w<CR>
    " 快速保存本文件，系统的<C-S>是全部保存
nnoremap <Leader>fc :action CloseContent<CR>
    " 关闭窗口但不保存。vim自带的ZZ,ZQ均为保存并关闭。
nnoremap <Leader>fr :action RecentFiles<CR>
    " 打开过的历史记录文件夹
nnoremap <Leader>fp :action ShowFilePath<CR>
    " 显示当前文件的文件路径
nnoremap <Leader>fm :action ShowPopupMenu<CR>
    " 弹出右键菜单
" <Leader>+数字键 切换文件窗口 Tab
nmap <silent> \1 1gt
nmap <silent> \2 2gt
nmap <silent> \3 3gt
nmap <silent> \4 4gt
nmap <silent> \5 5gt
nmap <silent> \6 6gt
nmap <silent> \7 7gt
nmap <silent> \8 8gt
nmap <silent> \9 9gt
nmap <silent> \0 10gt
nnoremap gw <C-W>w
    " 窗口循环切换，占用了原来m的mark功能
" --------------------------------
" Part 2.3. 撤销、重做，自动居中
nmap U <Action>($Redo)zz
nmap u uzz
" --------------------------------
" Part 2.4. 书签管理
nmap m; <Action>(ShowBookmarks)
    " 显示所有书签
nmap m' <Action>(Bookmarks)
    " 编辑书签
" 标记书签
nmap m/ <Action>(ToggleBookmark)
nmap m0 <Action>(ToggleBookmark0)
nmap m1 <Action>(ToggleBookmark1)
nmap m2 <Action>(ToggleBookmark2)
nmap m3 <Action>(ToggleBookmark3)
nmap m4 <Action>(ToggleBookmark4)
nmap m5 <Action>(ToggleBookmark5)
nmap m6 <Action>(ToggleBookmark6)
nmap m7 <Action>(ToggleBookmark7)
nmap m8 <Action>(ToggleBookmark8)
nmap m9 <Action>(ToggleBookmark9)
nmap ma <Action>(ToggleBookmarkA)
nmap mb <Action>(ToggleBookmarkB)
nmap mc <Action>(ToggleBookmarkC)
nmap md <Action>(ToggleBookmarkD)
nmap me <Action>(ToggleBookmarkE)
nmap mf <Action>(ToggleBookmarkF)
nmap mg <Action>(ToggleBookmarkG)
nmap mh <Action>(ToggleBookmarkH)
nmap mi <Action>(ToggleBookmarkI)
nmap mj <Action>(ToggleBookmarkJ)
nmap mk <Action>(ToggleBookmarkK)
nmap ml <Action>(ToggleBookmarkL)
nmap mm <Action>(ToggleBookmarkM)
nmap mn <Action>(ToggleBookmarkN)
nmap mo <Action>(ToggleBookmarkO)
nmap mp <Action>(ToggleBookmarkP)
nmap mq <Action>(ToggleBookmarkQ)
nmap mr <Action>(ToggleBookmarkR)
nmap ms <Action>(ToggleBookmarkS)
nmap mt <Action>(ToggleBookmarkT)
nmap mu <Action>(ToggleBookmarkU)
nmap mv <Action>(ToggleBookmarkV)
nmap mw <Action>(ToggleBookmarkW)
nmap mx <Action>(ToggleBookmarkX)
nmap my <Action>(ToggleBookmarkY)
nmap mz <Action>(ToggleBookmarkZ)

nmap 'a <Action>(GotoBookmarkA)
nmap 'b <Action>(GotoBookmarkB)
nmap 'c <Action>(GotoBookmarkC)
nmap 'd <Action>(GotoBookmarkD)
nmap 'e <Action>(GotoBookmarkE)
nmap 'f <Action>(GotoBookmarkF)
nmap 'g <Action>(GotoBookmarkG)
nmap 'h <Action>(GotoBookmarkH)
nmap 'i <Action>(GotoBookmarkI)
nmap 'j <Action>(GotoBookmarkJ)
nmap 'k <Action>(GotoBookmarkK)
nmap 'l <Action>(GotoBookmarkL)
nmap 'm <Action>(GotoBookmarkM)
nmap 'n <Action>(GotoBookmarkN)
nmap 'o <Action>(GotoBookmarkO)
nmap 'p <Action>(GotoBookmarkP)
nmap 'q <Action>(GotoBookmarkQ)
nmap 'r <Action>(GotoBookmarkR)
nmap 's <Action>(GotoBookmarkS)
nmap 't <Action>(GotoBookmarkT)
nmap 'u <Action>(GotoBookmarkU)
nmap 'v <Action>(GotoBookmarkV)
nmap 'w <Action>(GotoBookmarkW)
nmap 'x <Action>(GotoBookmarkX)
nmap 'y <Action>(GotoBookmarkY)
nmap 'z <Action>(GotoBookmarkZ)

" 跳转书签
nmap '\ <Action>(GotoNextBookmark)
nmap '; <Action>(GotoPreviousBookmark)
" --------------------------------
" Part 2.5. 界面显示
nnoremap <Leader>cv :action ChangeView<CR>
    " 改变PyC的视图
nnoremap g0 :set relativenumber!<CR>
    " 切换显示相对行号
sethandler <C-/> n:vim i:ide x:ide v:ide
    " 设置键的使用范围，具体见https://github.com/JetBrains/ideavim/wiki/sethandler
nnoremap <C-/> :nohls<CR>
    " 取消查找高亮显示
" 折叠
nnoremap za zA
    " 折叠光标下所有代码
nnoremap zm zM
    " 折叠所有代码，设置 foldlevel=0，设置 foldenable
nnoremap zr zR
    " 打开所有代码，设置 foldlevel 为最大值
nnoremap <C-T> <C-E>
    " 上滚一行改到C-T，与下滚一行C-Y对应

" --------------------------------
" Part 2.6. 命令模式
nnoremap g; :<Up>
    " 进入上次命令的对话框
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" 以下不按n、o、i、v、c等模式区分，只按功能区分
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Part 3. 光标移动或跳转
" --------------------------------
" Part 3.1. 优化原来
nnoremap - $
nnoremap [ {
nnoremap ] }
"无效？ nnoremap <expr> 0 col('.')==1?'^':'0'
"无效？ nnoremap | ^
" 增加退出到normal模式的按键，idea中引号'用 Þ 代表
" --------------------------------
" Part 3.2. 整页移动
" 调整c-h和c-l前后翻半页，操作后，当前行自动居中
" 调整a-h和a-l前后翻一页，操作后，当前行自动居中
nnoremap <A-H> <C-B>zz
nnoremap <A-L> <C-F>zz
" --------------------------------
" Part 3.3. 在插入和命令模式下移动光标，快速到行尾和行首
inoremap <C-J> <Down>
inoremap <C-K> <Up>
inoremap <C-N> <Home>
inoremap <C-M> <End>
cnoremap <C-J> <Down>
cnoremap <C-K> <Up>
cnoremap <C-N> <Home>
cnoremap <C-M> <End>
" --------------------------------
" Part 3.5. ace跳转，需要安装 AceJump 插件
noremap <Leader><Leader> :action AceAction<CR>
    " 白色光标——常规，ACE后到单词首字母。简化跳转，同默认快捷键<C-;>
noremap <Leader>ab :action AceBackwardAction<CR>
    " 白色光标——只向后ace,另外还有AceForwardAction
noremap <Leader>ad :action AceDeclarationAction<CR>
    " 天蓝色光标——ace并跳到改变量的声明处
noremap <Leader>at :action AceTargetAction<CR>
    " 橙色光标——ace并选中该单词，自带快捷键<A-C-;>
noremap <Leader>ar :action AceReverseAction<CR>
    " 绿色光标——ace后到单词尾部
noremap <Leader>aw :action AceWordAction<CR>
    " 显示所有单词首字母，另外还有AceWordBackwardsAction，AceWordEndAction，AceWordForwardAction，AceWordStartAction
noremap <Leader>al :action AceLineAction<CR>
    " 显示所有行首和行尾，自带快捷键<C-S-;>。
    " 只行首为AceLineStartsAction，只首字AceLineIndentsAction，只行尾为AceLineEndsAction
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Part 4. 查找、替换
" --------------------------------
" Part 4.1. vim查找
nnoremap g/ /<Up>
    " 进入上次向后搜索的对话框
vmap / y/<C-V><CR>
    " 选择字符后，/直接查找，类似*和#
" nnoremap <silent> * *N
    " *后不跳下一个
" 查找下一个内容，并居中
" nnoremap <silent> n nzz
" nnoremap <silent> N Nzz
" nnoremap <silent> * *zz
    " 区分大小写case sensitive
" nnoremap <silent> g* g*zz
    " 不区分大小写Case Insensitive
" nnoremap <silent> # #zz
" --------------------------------
" Part 4.2. idea查找find（本文件）或search（全局）
" sethandler <C-F> n:ide i:vim x:vim v:vim
    " 设置键的使用范围，具体见https://github.com/JetBrains/ideavim/wiki/sethandler
nnoremap <C-F> :action Find<CR>
    " 当前文件搜索，取消原vim功能：向下翻1页。
    " 没有vim的/健方便，但可以搜索组合词和中文，vim只能搜索独立的英文单词。
nnoremap <A-F> :action FindInPath<CR>
    " 全局分类搜索
" 全局搜索 goto
nnoremap <Leader>ge :action SearchEverywhere<CR>
    " 搜索任何位置，idea已有快捷方式：连续双击shift健
nnoremap <Leader>gc :action GotoClass<CR>
    " 打开 类   跳转对话框
nnoremap <Leader>gf :action GotoFile<CR>
    " 打开 文件 跳转对话框
nnoremap <Leader>ga :action GotoAction<CR>
    " 打开 动作 跳转对话框
nnoremap <Leader>gs :action FileStructurePopup<CR>
    " 弹出变量结构信息
" 代码溯源 code
nnoremap <Leader>cfu :action FindUsages<CR>
    " 打开当前方法的 查找 对话框
nnoremap <Leader>csu :action ShowUsages<CR>
    " 打开当前方法的 用法 对话框
nnoremap <Leader>cd :action GotoDeclaration<CR>
    " 跳转到用法或声明，和下面EditSource一样？
nnoremap <Leader>cs :action EditSource<CR>
    " 跳转到定义，vim自带快捷键：gd或gD或<C-]>，idea快捷键：<F4>
" --------------------------------
" part 4.3. idea的替换
noremap <C-R> :action Replace<CR>
    " 当前文件替换，取消原vim功能：重做（已改为 U ）
noremap <A-R> :action ReplaceInPath<CR>
    " 全局分类替换
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" part 5. 字符、文本修改
" --------------------------------
" part 5.1. 插入模式下增加删除快捷方式
inoremap <C-;> <del>
" 无效？ cnoremap <C-;> <del>
" --------------------------------
" part 5.2. 调整vim自带的数字增减快捷键
sethandler <C-A> n:ide i:vim x:vim v:vim
    " 设置键的使用范围，具体见https://github.com/JetBrains/ideavim/wiki/sethandler
nnoremap <A-X> <C-A>
    " 光标后的数字减1。<C-X>为加1
" --------------------------------
" Part 5.3. 缩进、排版
nmap <TAB> >>
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" part 6. 选择
" 符号选择测试成功：'test',"test",(test),[test],{test},test,test,test,test,test
" 符号选择测试不成功：/test/,;test;,test,,-test-,\test\,test,test,test,test,test,test,
" --------------------------------
" part 6.1. 选择到：第一个实体字符^改为o(行首0还是用0），行尾$改为p — 好用
nnoremap vo v^
    " 向前选择
nnoremap vp v$
    " 向后选择
onoremap o ^
    " cdy+o，向前选择，但不含本光标字符。与下面后不一样,如需包含,使用：voy
onoremap p $
    " cdy+p，向后选择，含本光标字符。dp相当于D
" --------------------------------
" Part 6.2. 选择单词或符号内的内容时，i和a后的优化 - vcxz代表([{<，'还是'，"变为.
" Part 6.2.1. dyc后的i(inside)优化
onoremap w iw
    " w和iw的区别：w从当前位置到单词结尾，iw无论什么位置都选择当前单词
onoremap v i(
    " 原来使用逗号,，但这样损失,本来在行内向前搜索的功能，所以改为其他
    " 优化surround功能不成功:onoremap swV sw(
    " 优化surround功能不成功:nmap sv s(
onoremap c i[
onoremap x i{
    " 如cx，将优先使用exchange的cx关键字功能（相当于一个o命令），{测试用}，因此增加以下
onoremap ix i{
onoremap z i<
onoremap ' i'
onoremap . i"
" Part 6.2.2. dyc后的a(around)优化
onoremap aw aw
onoremap av a(
onoremap ac a[
onoremap ax a{
onoremap az a<
onoremap a' a'
onoremap a. a"
" Part 6.2.3. v后的i(inside)优化
nnoremap vw viw
nnoremap vv vi(
nnoremap vc vi[
nnoremap vx vi{
nnoremap vz vi<
nnoremap v' vi'
nnoremap v. vi"
" Part 6.2.4. v后的a(around)优化
nnoremap vaw vaw
    " 选择包含单词后的空格
nnoremap vav va(
nnoremap vac va[
nnoremap vax va{
nnoremap vaz va<
nnoremap va' va'
nnoremap va. va"
" --------------------------------
" Part 6.3. 其他选择
" nnoremap <A-A> ggVG
    " 全选，此方法刷新光标位置，不好用。改为在idea的全选快捷键位<A-A>，或系统默认的<C-A>
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Part 7. 复制、粘贴
" --------------------------------
" Part 7.1. 寄存器相关
set ReplaceWithRegister
    " 执行替换文本操作不会覆盖寄存器的内容，操作符gr视同operator命令:
    " v模式：目标gr
    " n模式：grw,grr整行,gri(等于abl修改后的grv,gra<等于abl修改后的graz
nnoremap g' :registers<CR>
    " 显示寄存器
" 清空寄存器，以下PcY不支持vim的很多function功能，囧
    " command! WipeReg call setreg('1','')
    " command! WipeReg for i in range(a,z) | silent! call setreg(nr2char(i), []) | endfor
    " 全网没找到idea下如何删除寄存器，自行看看py退出时候变化，发现vim_settings_local.xml，嘿嘿
" 以下是笨方法
func WipeReg()
  let @" = ""
  let @0 = ""
  let @1 = ""
  let @2 = ""
  let @3 = ""
  let @4 = ""
  let @5 = ""
  let @6 = ""
  let @7 = ""
  let @8 = ""
  let @9 = ""
  let @- = ""
  let @* = ""
  let @+ = ""
  let @. = ""
  let @: = ""
  let @/ = ""
  echo "清空寄存器"
  "不支持： unlet @c
endfunc
nnoremap <expr> <A-Þ>  WipeReg()
    " idea中引号'用 Þ 代表
" --------------------------------
" Part 7.2. 增加粘贴寄存器"0的快捷键
" sethandler <C-P> n:vim i:ide x:vim v:vim
    " 设置键的使用范围，具体见https://github.com/JetBrains/ideavim/wiki/sethandler
noremap <C-P> "0p
inoremap <C-P> <C-R>0
    " abenl增加：解决d后粘贴之前y的内容，原PyC的<C-P>的形参信息功能改为<A-P>

" --------------------------------
" Part 7.3. 增加快速复制行的快捷键
nnoremap gp :put<CR>
    " 在当前行的下一行粘贴。:[line]pu[t] [x] 将文本 [来自寄存器 x] 放在 [行] 之后（默认当前行）
nnoremap go k:put<CR>
    " 在当前行的上一行粘贴
sethandler <C-D> n:ide i:vim x:vim v:vim
    " 设置键的使用范围，具体见https://github.com/JetBrains/ideavim/wiki/sethandler
" --------------------------------
" Part 7.4. 恢复各种模式下的^C和^V
vnoremap <C-C> "+y
vnoremap <C-V> "+P
inoremap <C-V> <C-R>+
cnoremap <C-V> <C-R>+
" --------------------------------
" Part 7.5. 整行移动
nmap <C-J> <Action>(MoveLineDown)
nmap <C-K> <Action>(MoveLineUp)
nmap <A-J> <Action>(MoveStatementDown)
nmap <A-K> <Action>(MoveStatementUp)
vmap <C-J> <Action>(MoveLineDown)
vmap <C-K> <Action>(MoveLineUp)
vmap <A-J> <Action>(MoveStatementDown)
vmap <A-K> <Action>(MoveStatementUp)
" --------------------------------
" Part 7.6. 交换文本或行
set exchange
    " 相互交换：cx{范围}(如w,e,b等)再cx{范围} ; cxx交换行; 第二次可用.快捷方式
    " v选中后X交换
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Part 8. 编程相关

" --------------------------------
" Part 8.1. 查询信息

" nnoremap <C-Q> :action QuickJavaDoc<CR>
    " 查看光标下的对应文档(如果有的话)，相当于vim的K，与原idea快捷键<C-Q>相同
noremap <A-E> :action ShowErrorDescription<CR>
    " 显示光标下的错误信息testabc，相当于<C-P>
" --------------------------------
" Part 8.2. 编程跳转
" nmap <A-O> <Action>(Back)
    " IDEA 自带的回退
" nnoremap <A-I> :action Forward<CR>
    " IDEA 自带的前进
noremap <A-O> :action GotoPreviousError<CR>
    " 上一个错误，idea快捷键：<S-F2>
noremap <A-I> :action GotoNextError<CR>
    " 下一个错误，idea快捷键：<F2>
" --------------------------------
" Part 8.3. 修改
nnoremap gs :action RenameElement<CR><ESC><Right>a
    " 元素名称重构，idea特色功能<S-F6>

" --------------------------------
" Part 8.4. PyCharm快捷插入代码 p+
noremap <Leader>pt :action InsertLiveTemplate<CR>
    " 插入实时模板 <C-J>
noremap <Leader>pi :action ImplementMethods<CR>
    " 实施方法 <C-I>
noremap <Leader>po :action OverrideMethods<CR>
    " 重写方法 <C-O>
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Part 9. aBenL定制，快捷添加指定代码

" --------------------------------
" Part 9.1. 针对ideavimrc
nnoremap <Leader>' I"<space><Esc>
    " 行首增加注释符"
nnoremap <Leader>" A<space><space><space><space>"<delete><space>
    " 行尾增加注释符"，并进入编辑模式
" --------------------------------
" Part 9.2. 针对Python
nnoremap <Leader># A<space><space>#<space>
    " 行尾增加注释符#，并进入编辑模式。idea内置快捷方式<C-/>或vim插件gcc为行首加#
vnoremap <Leader>pp cprint(f'{<C-r>"=}')<ESC>
    " 选中后，快速添加f方式输出数据

" --------------------------------
" Part 9.3. 函数测试：inserts a list number that increases
let counter = 0
inoremap <expr> <A-.> ListItem()
inoremap <expr> <A-,> ListReset()
func ListItem()
  let g:counter += 1
  return g:counter . '. '
endfunc
func ListReset()
  let g:counter = 0
  return ''
endfunc

" b:name  variable local to a buffer
" w:name  variable local to a window
" g:name  global variable (also in a function)
" v:name  variable predefined by Vim

set vs-success

"自定义"
inoremap jj <ESC>
nnoremap J 5j
nnoremap K 5k
nnoremap <S-L> $
nnoremap <S-H> 0 
nnoremap K 5k
"""""""""""""""""""""""""""""""""""""" END """""""""""""""""""""""""""""""""""""""
```