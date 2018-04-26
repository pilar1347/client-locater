import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Map } from '../models/map';
import { MapService } from '../services/map.service';
import { ISubscription } from 'rxjs/Subscription';
import * as SVG from 'svg.js';
import 'svg.panzoom.js';
import '../../assets/panzoom.extend.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy, OnInit {
	@Input() mapId: string;
	@Input() floor: string;
	@Input() room: string;

	@Output() navClose: EventEmitter<boolean> = new EventEmitter<boolean>();

	mapData: Map;
	mapSubscription: ISubscription
	params: ParamMap;
	centerMap: SVG.Doc;
	coords: any;
	maxZoom: number = 10;
	minZoom: number = 0.5;
	zoomFactor: number = 0.5;

	constructor(private route: ActivatedRoute,
		private mapService: MapService) { }

	ngOnInit() {
		// close sidenav in parent
		this.navClose.emit(true);

		this.centerMap = (SVG('centerMap') as any).panZoom({ zoomMin: this.minZoom, zoomMax: this.maxZoom, zoomFactor: this.zoomFactor});

		this.mapSubscription = this.mapService.getMap(this.mapId).subscribe(res => {

			this.mapData = res;

			// parse data
			let parser = new DOMParser();
			let parsedHtml = parser.parseFromString(this.mapData.data, 'text/html');
			let svgEl = parsedHtml.getElementsByTagName("svg")[0];

			// get each needed layer and serialize
			var serializer = new XMLSerializer();
			let artworkLayer = serializer.serializeToString(svgEl.getElementById('artwork'));
			let mapLayer = serializer.serializeToString(svgEl.getElementById('map'));

			this.centerMap.svg(artworkLayer + mapLayer);

			// move layers to center in view
			let vw = this.centerMap.viewbox().width;
			let artworkG = SVG.get('artwork');
			let mapG = SVG.get('map');

			let room = SVG.get(this.roomToSvgId());
			this.coords = {
				x: room.cx(),
				y: room.cy()
			};

			// get and move locator
			let locator = SVG.get('locator');
			locator.move(this.coords.x-10,this.coords.y-28);

			// show correct floor and artwork
			let showMe = this.floor;
			let hideMe = showMe === '1' ? '2' : '1';
			let items = ['floor', 'img'];

			for (var i=0; i<2; i++) {
				SVG.get(items[i] + showMe).attr('display', 'inline');
				SVG.get(items[i] + hideMe).attr('display', 'none');
			}

		});

	}

	ngOnDestroy() {
		this.mapSubscription.unsubscribe();
	}

	roomToSvgId(): string {
		let id = this.room;
		id = id.replace(/^1/g, '_x31_');
		id = id.replace(/^2/g, '_x32_');
		id = id.replace(/\ #/g, '_x23_');

		return id;
	}

	zoomToRoom() {
		(this.centerMap.animate() as any).zoomTo(3, this.coords);
	}

	zoomLimits(zoomLevel: number): number {
		return zoomLevel < this.minZoom ? this.minZoom : zoomLevel > this.maxZoom ? this.maxZoom : zoomLevel;
	}

	zoomIn() {
		let newZoom = this.zoomLimits(this.centerMap.viewbox().zoom + 1);

		(this.centerMap as any).zoom(newZoom);
	}

	zoomOut() {
		let newZoom = this.zoomLimits(this.centerMap.viewbox().zoom - 1);

		(this.centerMap as any).zoom(newZoom);
	}

	pan(dir: number) {
		(this.centerMap as any).panTo(dir);
	}

}
