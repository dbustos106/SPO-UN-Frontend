<template>
	<div>
		<div class="sidebar open" style="--bg-color:#11101d; --secondary-color:#1d1b31; --home-section-color:#e4e9f7; --logo-title-color:#fff; --icons-color:#fff; --items-tooltip-color:#e4e9f7; --serach-input-text-color:#fff; --menu-items-hover-color:#fff; --menu-items-text-color:#fff; --menu-footer-text-color:#fff;">
		<div class="logo-details">
		  <i class="bx icon bxl-c-plus-plus"></i>
		  <div class="logo_name"> Akahon </div>
		  <i id="btn" class="bx bx-menu-alt-right"></i>
		</div>
		<div class="ps ps--active-y" style="height: 87vh;">
		  <ul class="nav-list">
			<li>
			  <i class="bx bx-search"></i>
			  <input type="text" placeholder="Search...">
			  <span class="tooltip">Search</span>
			</li>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-grid-alt"></i>
				  <span class="links_name">Dashboard</span>
				</a>
				<span class="tooltip">Dashboard</span>
			  </li>
			</span>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-user"></i>
				  <span class="links_name">User</span>
				</a>
				<span class="tooltip">User</span>
			  </li>
			</span>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-chat"></i>
				  <span class="links_name">Messages</span>
				</a>
				<span class="tooltip">Messages</span>
			  </li>
			</span>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-pie-chart-alt-2"></i>
				  <span class="links_name">Analytics</span>
				</a>
				<span class="tooltip">Analytics</span>
			  </li>
			</span>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-folder"></i>
				  <span class="links_name">File Manager</span>
				</a>
				<span class="tooltip">Files</span>
			  </li>
			</span>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-cart-alt"></i>
				  <span class="links_name">Order</span>
				</a>
				<span class="tooltip">Order</span>
			  </li>
			</span>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-heart"></i>
				  <span class="links_name">Saved</span>
				</a>
				<span class="tooltip">Saved</span>
			  </li>
			</span>
			<span>
			  <li>
				<a href="#">
				  <i class="bx bx-cog"></i>
				  <span class="links_name">Setting</span>
				</a>
				<span class="tooltip">Setting</span>
			  </li>
			</span>
		  </ul>
		  <div class="ps__rail-x" style="left: 0px; bottom: 0px;">
			<div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
		  </div>
		  <div class="ps__rail-y" style="top: 0px; height: 537px; right: 0px;">
			<div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 532px;"></div>
		  </div>
		</div>
		<div class="profile">
		  <div class="profile-details">
			<img src="/vue-sidebar-menu-akahon/img/photo.4e4bdfc3.jpg" alt="profileImg">
			<div class="name_job">
			  <div class="name"> Fayzullo Saidakbarov </div>
			  <div class="job"> Frontend vue developer </div>
			</div>
		  </div>
		  <i id="log_out" class="bx bx-log-out"></i>
		</div>
	  </div>
	</div>
</template>