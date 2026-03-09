declare module 'react-mapbox-gl' {
  import { Component } from 'react';
  import { Map as MapboxMap } from 'mapbox-gl';

  export interface MapboxProps {
    style: string;
    center?: [number, number];
    zoom?: [number];
    containerStyle?: React.CSSProperties;
    onError?: (error: Error) => void;
    movingMethod?: 'jumpTo' | 'easeTo' | 'flyTo';
    children?: React.ReactNode;
    onStyleLoad?: (map: MapboxMap) => void;
  }

  export interface MapboxOptions {
    accessToken: string;
    maxZoom?: number;
    minZoom?: number;
    scrollZoom?: boolean;
    dragRotate?: boolean;
    trackResize?: boolean;
    attributionControl?: boolean;
    logoPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  }

  export interface LayerProps {
    type: string;
    id: string;
    layout?: any;
    paint?: any;
    before?: string;
    sourceId?: string;
    images?: any[];
    filter?: any[];
  }

  export interface FeatureProps {
    coordinates: [number, number];
    properties?: any;
  }

  export interface PopupProps {
    coordinates: [number, number];
    offset?: any;
    children?: React.ReactNode;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: React.ReactNode;
  }

  export default function ReactMapboxGl(options: MapboxOptions): React.ComponentType<MapboxProps>;

  export class Layer extends Component<LayerProps> {}
  export class Feature extends Component<FeatureProps> {}
  export class Popup extends Component<PopupProps> {}
  export class Marker extends Component<MarkerProps> {}
}
